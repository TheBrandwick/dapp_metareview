import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import TakeSurveyForm from '../TakeSurveyForm';

function LotteryCard({ data, enter_into_survey, elect_winner, getParticipantInfo, claimReward, userIsManager, checkParticipationStatus, submit_review }) {
  const wallet = useWallet();
  const [participationStatus, setParticipationStatus] = useState(null);
  const [openTakeSurveyForm, setOpenTakeSurveyForm] = useState(null);
  useEffect(() => {
    updateParticipationStatus();
  }, [data])
  const updateParticipationStatus = async () => {
    
    let status = await checkParticipationStatus(data.id);
    
    setParticipationStatus(status)

  }

  return (
    <>
      <div className={`lottery-card ${!data.isActive ? 'inactive' : ''}`}>
        <div className='image-survey'>

          <img src="/survey2.png" alt="participant" />
        </div>
        <div className='survey-heading'>
          {data?.title}
        </div>
        <div className='survey-rewards'>
          Reward to fill {parseInt(data.rewardPerParticipant.toString()) / LAMPORTS_PER_SOL} SOL
        </div>
        <div className='survey-about'>
          Fill the company detail on the basis of your experinec ,Feel free to reach out to himanshu091rawat@gmail.com for any queries
        </div>


        <div className='act-btns'>
          {!participationStatus && <button className='entry-btn' onClick={() => enter_into_survey(data.id)}>ENROLL NOW</button>}
        </div>
        <div className='entry-fee'>


          {/* <div className='cost'>
            <div className='title'>Entry Fee</div>
            <div className='fee'>0<span className='currency'>SOL</span></div>
          </div> */}
        </div>


        {participationStatus && !participationStatus?.completed && <div className='entry-btn' onClick={() => setOpenTakeSurveyForm(data)}>Continue</div>}
        {participationStatus?.completed && !participationStatus?.rewarded && <div className='claim-btn' onClick={()=>claimReward(data.id)}>Claim Reward</div>}
        {participationStatus?.completed && participationStatus?.rewarded && <div className='claim-btn disabled' onClick={() => { }}>Reward Claimed</div>}
        {/* <div className='participants'>
          <img src="https://toppng.com/uploads/preview/people-people-icon-blue-11553450975ccznm1rxwu.png" alt="participant" />
          <div className='count'>{data.currentParticipantsCount.toString()}</div>
        </div> */}
      </div>
      <TakeSurveyForm
        submit_review={submit_review}
        show={openTakeSurveyForm}
        closeFunction={() => setOpenTakeSurveyForm(false)}
      />
    </>

  )
}

export default LotteryCard