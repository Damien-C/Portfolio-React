import React from 'react';
import '../App.css';
import Typewriter from 'typewriter-effect';

class Main extends React.Component{
    render(){
        return(
            <div className='frameWrap'>
                <div className='firstTextShow'>
                    A PROGRAMMER CAN CHANGE THE WORLD !
                </div>
                <div className='paragraghs'>
                    <Typewriter
                        options={{delay: 50}}
                        onInit={(typewriter) => {
                            typewriter.typeString('I believe that a programmer can change the world. Alchemists existed in ancient time and believed in the impossible whereby they unknowingly changed our world’s resources, by inventing, what is today known as chemistry and medicine. Programmers exist in today’s world and continue believing in the impossible. They invent and contribute in many fields by using their given resources and their imagination. In conclusion: Programmers can be scientists. Programmers can be artists. Programmers are the new alchemists.')
                            .callFunction(() => {
                                console.log('String typed out!');
                            })
                            .callFunction(() => {
                                console.log('All strings were deleted');
                            })
                            .start();
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Main;