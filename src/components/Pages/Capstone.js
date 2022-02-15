import React from 'react';
import './Capstone.css';

import CardItem from '../CardItem'

function Capstone() {
    return (
        <div className='capstone-container'>
            <div className='capstone-text-container'>
              <h1 className='capstone-heading'>
                  Capstone
              </h1>
              <h3 className='capstone-subheading'>
                  During my final year at university I was put into a group where we had to build a specific project based on our strengths for a client outside of the university.
                  We chose to build an app using Flutter and Dart - which were Googles new languages for app development very similar to Apples app development program, Swift, but mixed in with elements of the React Javascript framework.
              </h3>
              <h3 className='capstone-subheading'>
                  For our project we built a mobile app for the Head of Respiratory at Sir Charles Gardiner Hospital in Perth, and his patients. The app would be downloaded by the patients, or be used at the clinic
                  on their devices as a way to capture information without the need of paperwork and the mental strain of "filling forms". The mobile app was also linked to a web app, which the doctor could
                  access on their computer and use to send reminders and calendar events to the patients via the mobile app, and also keep track of their current medical plan within the scope of
                  care for that facility(e.g. respiratory health).
              </h3>
            </div>
            <div className='cards-container'>
                <div className='cards-wrapper'>
                    <ul className='cards-items'>
                      <CardItem 
                          src={require('../../assets/images/capstone/capstone1.png')} 
                          text='Welcome page'
                          tags=''
                          info='The sign in and sign up buttons.'
                          path=''
                      />
                      <CardItem 
                          src={require('../../assets/images/capstone/capstone2.png')} 
                          text='Main page'
                          tags=''
                          info='The calender, and some of the options available on that page including creating a new event, and picking some viewing options.'
                          path=''
                      />
                      <CardItem 
                          src={require('../../assets/images/capstone/capstone3.png')} 
                          text='New event page'
                          tags=''
                          info='This is where the user is sent after clicking the plus button on the main page. They can input an event title and a date which will go into the calendar on the main page.'
                          path=''
                      />
                    </ul>
                    <ul className='cards-items'>
                      <CardItem 
                          src={require('../../assets/images/capstone/capstone4.png')} 
                          text='Forms page and record an event page'
                          tags=''
                          info='This is where the user can fill out forms which are custom set by their doctor using the web app.'
                          path=''
                      />
                      <CardItem 
                          src={require('../../assets/images/capstone/capstone5.png')} 
                          text='User profile page'
                          tags=''
                          info='The user will have to create a user profile and have the ability to fill out some health information there which their doctor can see. This was also done to give the app more of a personable feel.'
                          path=''
                      />
                    </ul>
                    <ul className='cards-items'>
                      <CardItem 
                          src={require('../../assets/images/capstone/capstone6.png')} 
                          text='Help page'
                          tags=''
                          info='From the main page the user has quick access to the help page, to either contact their clinician, or record a new event (asthma attack).'
                          path=''
                      />
                      <CardItem 
                          src={require('../../assets/images/capstone/capstone7.png')} 
                          text='Email your clinician'
                          tags=''
                          info='The user can click on the help button on the main page to get to this page where they are able send an email to their doctor via the app and their linked email account.'
                          path=''
                      />
                    </ul>
                </div>
            </div>
            <div className='capstone-text-container'>
              <h3 className='capstone-end'>
                  This project also included a full presentation of both the mobile app and web app, and also a full run down of the testing manual and user manual which we created.
              </h3>
            </div>
        </div>
    )
}

export default Capstone

