import React, { useState } from 'react'
import useProgram from './useProgram';
import * as anchor from '@project-serum/anchor'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

// Random int generation function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function useMethods() {
  const { program, wallet } = useProgram();
  const [all_surveys, set_all_surveys] = useState([])
  const [userData, setUserData] = useState(null)
  const [fetchingUserAccount, setFetchingUserAccount] = useState(null)

  const checkAccount = async () => {
    setFetchingUserAccount(true)
    let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("user"), wallet.publicKey.toBuffer()],
      program.programId
    )
    try {
      let user_data = await program.account.user.fetch(user_pda);
      // console.log(user_data)
      setUserData(user_data)
    } catch {
      console.log("New user found!")
    } finally {
      setFetchingUserAccount(false)
    }
  }
  const getAllSurveys = async () => {
    const all_surveys = await program.account.survey.all();
    // console.log({ all_surveys })
    set_all_surveys(all_surveys)
  }
  const initialize = async () => {
    let [account_state_signer] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("state")],
      program.programId
    )
    const tx = await program.rpc.initialize({
      accounts: {
        programState: account_state_signer,
        owner: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      }
    });
    console.log("Your initialized transaction signature", tx);
  }

  const create_survey = async (data) => {
    let [program_state_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('state')],
      program.programId
    )

    let program_state_data = await program.account.programState.fetch(program_state_pda);
    // console.log({program_state_data})
    let survey_count = program_state_data.surveyCount;
    let [survey_account_pda, survey_bump] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('survey'), new anchor.BN(survey_count).toArrayLike(Buffer, 'be', 8)],
      program.programId
    )
    let date_in_number = (new Date(data.validUntil)).getTime();
    let payload = {
      bump: survey_bump,
      maxParticipantsCount: new anchor.BN(parseInt(data.maxParticipantsCount)),
      rewardPerParticipant: new anchor.BN(parseInt(data.rewardPerParticipant * LAMPORTS_PER_SOL)),
      validUntil: new anchor.BN(date_in_number),
      title: data.title,
      isDraft: data.isDraft,
      isActive: data.isActive,
      formUri: data.formUri
    }

    // Add your test here.
    const tx = await program.rpc.createSurvey(
      payload.bump,
      payload.maxParticipantsCount,
      payload.rewardPerParticipant,
      payload.validUntil,
      payload.title,
      payload.isDraft,
      payload.isActive,
      payload.formUri,
      {
        accounts: {
          programState: program_state_pda,
          survey: survey_account_pda,
          creator: wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId
        }
      });
    // let survey_data = await program.account.survey.fetch(survey_account_pda);
    // console.log("Create survey => ", survey_data)
    console.log("Your transaction signature (Create Survey)", tx);

    getAllSurveys();
  }
  const edit_survey = async (survey_id, data) => {
    let [survey_account_pda, survey_bump] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('survey'), new anchor.BN(survey_id).toArrayLike(Buffer, 'be', 8)],
      program.programId
    )
    let survey_data = await program.account.survey.fetch(survey_account_pda);
    console.log("Edit survey => ", survey_data)
    let payload = {
      isDraft: data.isDraft,
      isActive: data.isActive,
      formUri: data.formUri
    }

    // Add your test here.
    const tx = await program.methods.editSurvey(
      payload.isDraft,
      payload.isActive,
      payload.formUri
    )
      .accounts({
        survey: survey_account_pda,
        user: wallet.publicKey,
      })
      .rpc();
    console.log("Your transaction signature (Edit Survey)", tx);

    getAllSurveys();
  }
  const enter_into_survey = async (survey_id) => {
    let { id } = await getCurrentUser();
    console.log("Pre enter_into_survey", "user_id=", id.toString(), "survey_id=", survey_id.toString())
    let [survey_account_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('survey'), new anchor.BN(survey_id).toArrayLike(Buffer, 'be', 8)],
      program.programId
    )

    let [participation_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [
        utf8.encode('participation'),
        new anchor.BN(id).toArrayLike(Buffer, 'be', 8),
        new anchor.BN(survey_id).toArrayLike(Buffer, 'be', 8)
      ],
      program.programId
    )


    let payload = {
      user_id: new anchor.BN(id)
    }

    // Add your test here.
    const tx = await program.rpc.participateSurvey(
      id, {
      accounts: {
        participation: participation_pda,
        survey: survey_account_pda,
        user: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      }
    }
    );
    console.log("Your transaction signature (Enter Survey)", tx);
    await getAllSurveys();
  }
  const submit_review = async (survey_id, form_submission_uri) => {
    let { id } = await getCurrentUser();
    let [survey_account_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('survey'), new anchor.BN(survey_id).toArrayLike(Buffer, 'be', 8)],
      program.programId
    )

    let [participation_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('participation'), new anchor.BN(id).toArrayLike(Buffer, 'be', 8), new anchor.BN(survey_id).toArrayLike(Buffer, 'be', 8)],
      program.programId
    )


    let payload = {
      user_id: id
    }

    // Add your test here.
    const tx = await program.rpc.submitSurveyAsParticipant(payload.user_id, form_submission_uri,{
      accounts:{
        participation: participation_pda,
        survey: survey_account_pda,
        user: wallet.publicKey,
      },
    });
    console.log("Your transaction signature (Submit Survey)", tx);
    await getAllSurveys();
  }

  const elect_winner = async (lottery_index) => {
    let [account_state_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("state")],
      program.programId
    )

    let [lottery_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("lottery"), new anchor.BN(lottery_index).toArrayLike(Buffer, 'be', 8)],
      program.programId
    )
    let lottery_data = await program.account.lottery.fetch(lottery_pda);
    let total_participants = parseInt(lottery_data.participantCount.toString());
    const winning_index = getRandomInt(total_participants);
    console.log("choosen winner index is =", winning_index)
    let tx = await program.rpc.finalizeWinner(new anchor.BN(winning_index), {
      accounts: {
        programState: account_state_pda,
        lottery: lottery_pda,
        user: wallet.publicKey,
      }
    });
    console.log("Finalize winner tx=", tx);
    getAllSurveys();
  }

  const getParticipantInfo = async (participant_pda) => {
    const participant_data = await program.account.participant.fetch(participant_pda);
    return participant_data
  }

  const claimReward = async (survey_id) => {
    let { id } = await getCurrentUser();
    
    let [survey_account_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('survey'), new anchor.BN(survey_id).toArrayLike(Buffer, 'be', 8)],
      program.programId
    )

    let [participation_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [
        utf8.encode('participation'),
        new anchor.BN(id).toArrayLike(Buffer, 'be', 8),
        new anchor.BN(survey_id).toArrayLike(Buffer, 'be', 8)
      ],
      program.programId
    )


    // Add your test here.
    const tx = await program.rpc.claimSurveyReward(id, {
      accounts:{
        participation: participation_pda,
        survey: survey_account_pda,
        user: wallet.publicKey,
      },
    });

    console.log("Claim Reward tx=", tx)
    getAllSurveys()
  }

  const getManager = async () => {
    let [account_state_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("state")],
      program.programId
    )
    let account_state_data = await program.account.programState.fetch(account_state_pda);
    return account_state_data.owner
  }

  const signUpUserRequest = async (data) => {
    let [program_state_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('state')],
      program.programId
    )
    let program_state_data = await program.account.programState.fetch(program_state_pda);
    console.log({ program_state_data })
    let user_count = program_state_data.userCount;
    let [user_account_pda, user_bump] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('user'), wallet.publicKey.toBuffer()],
      // new anchor.BN(account_state_data.lotteryCount).toArrayLike(Buffer, 'be', 8)
      program.programId
    )
    let [fund_locker_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('locker'), new anchor.BN(user_count).toArrayLike(Buffer, 'be', 8)],
      program.programId
    )
    let payload = {
      bump: user_bump,
      first_name: data.f_name,
      last_name: data.l_name,
      email: data.email,
      profile_pic: data.profile_pic
    }
    console.log({ payload })
    // console.log("Tony Account Addres", user_account_pda.toString())
    // Add your test here.
    const tx = await program.rpc.signUpUser(payload.bump, payload.first_name, payload.last_name, payload.email, payload.profile_pic, {
      accounts: {
        programState: program_state_pda,
        userAccount: user_account_pda,
        fundLocker: fund_locker_pda,
        user: wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      },
      // signers: [wallet]
    });
    console.log("Your signup transaction signature", tx);
    //   const tx = await program.methods.signUpUser(
    //     payload.bump, payload.first_name, payload.last_name, payload.email, payload.profile_pic
    //   )
    //     .accounts({
    //       programState: program_state_pda,
    //       userAccount: user_account_pda,
    //       fundLocker: fund_locker_pda,
    //       user: wallet.publicKey,
    //       systemProgram: anchor.web3.SystemProgram.programId
    //     })
    //     .signers([wallet])
    //     .rpc();
  }

  const getCurrentUser = async () => {
    let [current_user_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('user'), wallet.publicKey.toBuffer()],
      program.programId
    )
    let user_data = await program.account.user.fetch(current_user_pda);
    return user_data
  }

  const checkParticipationStatus = async (survey_id) => {

    let { id } = await getCurrentUser();
    console.log("user_id=",id.toString())
    let [participant_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('participation'),
      new anchor.BN(id).toArrayLike(Buffer, 'be', 8),
      new anchor.BN(survey_id).toArrayLike(Buffer, 'be', 8)
      ],
      program.programId
    )
    try {

      let found_participation = await program.account.participation.fetch(participant_pda);
      return found_participation
    } catch (e) {
      return false
    }
  }
  return {
    userData,
    checkAccount,
    fetchingUserAccount,
    all_surveys,
    initialize,
    getAllSurveys,
    enter_into_survey,
    submit_review,
    create_survey,
    edit_survey,
    elect_winner,
    getParticipantInfo,
    claimReward,
    getManager,
    signUpUserRequest,
    checkParticipationStatus
  }
}

export default useMethods