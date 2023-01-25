import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
    return (
        <div className='cards'>
            <div id='projects'></div>
            <h1>My Projects</h1>
            <div className='cards-container'>
                <div className='cards-wrapper'>
                    <ul className='cards-items'>
                        <CardItem 
                            src={require('../assets/images/crm.png')} 
                            text='CRM'
                            tags='TypeScript React CSS'
                            info='Built this CRM with barebones functionality and styled it myself. Moved into use Material UI and redisgned the aesthetic. Backend coming soon.'
                            path='https://naste-crm-test.netlify.app/'
                        />
                        <CardItem 
                            src={require('../assets/images/golf.png')}
                            text='Golf Score Tracking App'
                            tags='TypeScript React CSS NodeJS'
                            info='An app that allows my friends and I to track our scores of a particular golf course we play on, with authentication, live client/server updates, and database storage.'
                            path='https://hypnos.fans/'
                        />
                    </ul>
                    <ul className='cards-items'>
                        <CardItem 
                            src={require('../assets/images/capstone/fluttericon.png')} 
                            text='Capstone'
                            tags='Flutter Dart Firebase'
                            info='Capstone unit during final year of University where myself and a team of students built an app for the Head of Respiratory at Sir Charles Gairdner Hospital.'
                            path='/capstone'
                        />
                        <CardItem 
                            src={require('../assets/images/colour-search/colour-search1.png')}
                            text='Colour Search'
                            tags='JavaScript React HTML CSS'
                            info='Playing with React and implementing complex maths to show colours related to what I have typed into the search bar.'
                            path='https://colour-search-naste.netlify.app/'
                        />
                    </ul>
                    <ul className='cards-items'>
                        <CardItem 
                            src={require('../assets/images/metamask-logo.png')}
                            text='Web3.0'
                            tags='...Site coming soon'
                            info='A simple website to display a collection of Crypto Assets.'
                            path='web3'
                        />
                        <CardItem 
                            src={require('../assets/images/replit-logo.png')} 
                            text='Discord Bot'
                            tags='JavaScript'
                            info='A bot which goes through a list of twitter users every 20 minutes and posts to my own discord if they are following somebody new'
                            path='discord'
                        />
                    </ul>
                    <ul className='cards-items'>
                        <CardItem 
                            src={require('../assets/images/ServCli/serv-cli1.png')} 
                            text='Client Server Uni Project'
                            tags='Python'
                            info='Client/Server game for a project at University where I handle errors and gameplay mechanics based on disconnects, reconnects and a queue of players.'
                            path=''
                        />
                        <CardItem 
                            src={require('../assets/images/ai-agent/threechess1.png')}
                            text='AI and Agent Uni Project'
                            tags='Java'
                            info='Artifical Intelligence and Agents project for University where I implemented the Monte Carlo algorithm for an agent to play ThreeChess.'
                            path=''
                        />
                    </ul>
                    <ul>
                        <h1 className='card-footer'>Ask me about my private repositories!</h1>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
