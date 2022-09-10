import { useWallet } from '@solana/wallet-adapter-react'
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import * as anchor from '@project-serum/anchor'
import idl from '../../idl.json';
import React, { useEffect, useState } from 'react'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import useProgram from '../../hooks/useProgram';
import LotteryCard from '../LotteryCard';
import useMethods from '../../hooks/useMethods';
import { Box, Modal } from '@material-ui/core';
import CreateSurveyForm from '../CreateSurveyForm';





function MainView() {
  const wallet = useWallet()
  const walletAddress = wallet.publicKey.toString();
  const [userIsManager, setUserIsManager] = useState(false)
  const [openCreateLotteryForm, setOpenCreateLotteryForm] = useState(false)

  const [signupForm, setSignupForm] = useState({
    f_name: "",
    l_name: "",
    email: "",
    profile_pic: ""
  })

  const {
    userData,
    fetchingUserAccount,
    checkAccount,
    all_surveys,
    getAllSurveys,
    enter_into_survey,
    submit_review,
    create_survey,
    initialize,
    elect_winner,
    getParticipantInfo,
    claimReward,
    getManager,

    signUpUserRequest,
    checkParticipationStatus
  } = useMethods();



  useEffect( () => {
    console.log({all_surveys})
     checkAccount();
      getAllSurveys();
      checkOwner();
  }, [])


  const checkOwner = async () => {
    let user = await getManager();
    if (user.toString() === wallet.publicKey.toString()) {
      setUserIsManager(true)
    }
  }
  const handleSignUp = async (e) => {
    console.log("handleSignUp")
    e.preventDefault();
    await signUpUserRequest(signupForm)
  };
  const updateSignupForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const renderSignup = () => {
    return <form onSubmit={handleSignUp}>
      <input
        name="f_name"
        type="text"
        value={signupForm.f_name}
        onChange={(e) => updateSignupForm(e)}
        placeholder="First name"
      />
      <input
        name="l_name"
        type="text"
        value={signupForm.l_name}
        onChange={(e) => updateSignupForm(e)}
        placeholder="Last name"
      />
      <input
        name="email"
        type="text"
        value={signupForm.email}
        onChange={(e) => updateSignupForm(e)}
        placeholder="email"
      />
      <input
        name="profile_pic"
        type="text"
        value={signupForm.profile_pic}
        onChange={(e) => updateSignupForm(e)}
        placeholder="profile_pic"
      />
      <button type="submit" className="btn btn-square btn-ghost">Signup</button>
    </form>
  }
  return (
    <>
      {fetchingUserAccount && <div className=''>Verifying...</div>}
      {!fetchingUserAccount && <>
        {userData && <div className='main-container'>
          <button className='create-btn' onClick={() => setOpenCreateLotteryForm(true)}>create survey</button>
          <div className='heading-lottery-type'>Active:</div>
          <div className='lottery-grid'>
            {all_surveys?.map(survey => {
              if(Number(survey.account.id.toString()) > 6){
                return <LotteryCard
                  key={survey.account.id}
                  data={survey.account}
                  enter_into_survey={enter_into_survey}
                  elect_winner={elect_winner}
                  getParticipantInfo={getParticipantInfo}
                  claimReward={claimReward}
                  userIsManager={userIsManager}
                  submit_review={submit_review}
                  checkParticipationStatus={checkParticipationStatus}
                />
              }

            })}
          </div>


          <CreateSurveyForm create_survey={create_survey} show={openCreateLotteryForm} closeFunction={() => setOpenCreateLotteryForm(false)} />

        </div>}
        {!userData && renderSignup()}
      </>}

    </>
  )

}

export default MainView