import React from 'react'
import './Modal.css'
import Counter from '../Counter'
import { useState } from 'react';

//export default class Modal extends React.Component {


//    constructor({ data })
//    {
//        super(data)
//        this.state = {
//            isOpen: false,
//            dates: data
//        }
//    }

//    render() {
//        return (
//            <React.Fragment>
//                <button onClick={() => this.setState({ isOpen: true })}>
//                    Open modal
//        </button>

//                {this.state.isOpen && (
//                    <div className='modal'>
//                        <div className='modal-body'>
//                            <h1>Modal title</h1>
//                            <p>I am awesome modal!</p>
//                            <Counter data={this.state.dates} />
//                            <button onClick={() => this.setState({ isOpen: false })}>
//                                Close modal
//              </button>
//                        </div>
//                    </div>
//                )}
//            </React.Fragment>
//        )
//    }
//}

export default Modal
function Modal({ data })
{
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
        {/*    <button onClick={() => setIsOpen(true)}>*/}
        {/*        Open modal*/}
        {/*</button>*/}

            {this.state.isOpen && (
                <div className='modal'>
                    <div className='modal-body'>
                        <h1>Modal title</h1>
                        <p>I am awesome modal!</p>
                        <Counter data={data} />
              {/*          <button onClick={() => setIsOpen(false)}>*/}
              {/*              Close modal*/}
              {/*</button>*/}
                    </div>
                </div>
            )}
        </div>
    )
}