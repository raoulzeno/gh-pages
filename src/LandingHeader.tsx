import React, { useEffect, useState} from 'react';
import './App.css';


const zens = ["development.", "your website.", "programming.", "web design."];

enum Phase {
	Typing,
	Pausing,
	Deleting,
}

const TYPING_INTERVAL = 100;
const PAUSE_TIME = 2000;
const DELETING_INTERVAL = 50;

const useTypedZens = (zens) => {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [phase, setPhase] = useState('Phase.Typing')
	const [typedZen, setTypedZen] = useState('');
	useEffect(() => {
		switch(phase) {
		case Phase.Typing:{
			const nextTypedZen = zens[selectedIndex].slice(0, typedZen.length + 1);

			if (nextTypedZen === typedZen) {
				setPhase(Phase.Pausing)
				return
			}

			const timeout = setTimeout(() => {
				setTypedZen(nextTypedZen);
			},TYPING_INTERVAL);

			return () => clearTimeout(timeout)
		}
		case Phase.Deleting:{
			if (!typedZen) {
				const nextIndex = selectedIndex + 1;
				setPhase(Phase.Typing)
				setSelectedIndex(zens[nextIndex] ? nextIndex : 0);
				return
			}
			const nextRemaining = zens[selectedIndex].slice(0, typedZen.length - 1);
			const timeout = setTimeout(() => {
				setTypedZen(nextRemaining);
			},DELETING_INTERVAL);

			return () => clearTimeout(timeout)
		}
		case Phase.Pausing:
		default:
			const timeout = setTimeout(() => {
				setPhase(Phase.Deleting);
			},PAUSE_TIME);

			return () => clearTimeout(timeout)
		}
		// if (phase === Phase.Pausing) return;

		
	}, [zens, typedZen, phase, selectedIndex]);

	return typedZen;
}
const LandingHeader = () => {
	const zen = useTypedZens(zens);
	return(
		<div className='landingHeader'>
			<h1 className='headerTop'>Be <span id='zenDesign'>Zen</span> about <br/><span className='typingAnimation'>{zen}</span></h1>
		</div>
	)
}
export default LandingHeader;