import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
    return (
        <div className='cards'>
            <h1>My Projects</h1>
            <div className='cards-container'>
                <div className='cards-wrapper'>
                    <ul className='cards-items'>
                        <CardItem 
                            src={require('../assets/images/capstone/fluttericon.png')} 
                            text='Capstone'
                            tags='Flutter Dart Firebase'
                            info='Capstone unit during final year of University where myself and a team of students built an app for the Head of Respiratory at Sir Charles Gairdner Hospital'
                            path='/'
                        />
                        <CardItem 
                            src={require('../assets/images/colour-search/colour-search1.png')}
                            text='Colour Search'
                            tags='Javascript React HTML CSS'
                            info='Playing with React and implementing complex maths to show colours related to what I have typed into the search bar'
                            path='/'
                        />
                    </ul>
                    <ul className='cards-items'>
                        <CardItem 
                            src={require('../assets/images/ServCli/serv-cli1.png')} 
                            text='Client Server Uni Project'
                            tags='Python'
                            info='Client/Server game for a project at University where I handle errors and gameplay mechanics based on disconnects, reconnects and a queue of players'
                            path='/'
                        />
                        <CardItem 
                            src={require('../assets/images/metamask-logo.png')}
                            text='Web3.0'
                            tags='...Site coming soon'
                            info='A simple website to display a collection of Crypto Assets'
                            path='/'
                        />
                    </ul>
                    <ul className='cards-items'>
                        <CardItem 
                            src={require('../assets/images/replit-logo.png')} 
                            text='Discord Bot'
                            tags='Javascript'
                            info='A bot which goes through a list of twitter users every 20 minutes and posts to my own discord if they are following somebody new'
                            path='/'
                        />
                        <CardItem 
                            src={require('../assets/images/ai-agent/threechess1.png')}
                            text='AI and Agent Uni Project'
                            tags='Java'
                            info='Artifical Intelligence and Agents project for University where I implemented a Monte Carlo algorithm for an agent to play ThreeChess'
                            path='/'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
