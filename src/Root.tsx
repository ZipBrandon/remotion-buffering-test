import {MyComposition} from './Composition';
import './style.css';

import {Player, PlayerRef, RenderPlayPauseButton} from '@remotion/player';
import {useCallback, useEffect, useRef, useState} from 'react';
import {getVideoMetadata} from '@remotion/media-utils';

const src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
export const RemotionRoot: React.FC = () => {

 const playerRef = useRef<PlayerRef>(null);



	const [buffering, setBuffering] = useState(false);

	useEffect(() => {
		const { current } = playerRef;
		if (!current) {
			return;
		}

		const onBuffering = () => {
			setBuffering(true);
			console.log("on buffer");
		};
		const onResume = () => {
			setBuffering(false);
			console.log("on resume");
		};

		current.addEventListener("waiting", onBuffering);
		current.addEventListener("resume", onResume);
		return () => {
			current.removeEventListener("waiting", onBuffering);
			current.removeEventListener("resume", onResume);
		};
	}, [playerRef, setBuffering]);

	const [duration, setDuration] = useState(1);

		useEffect(() => {
		getVideoMetadata(src)
			.then(({ durationInSeconds }) => {
				setDuration(Math.round(durationInSeconds * 30));
			})
			.catch((err) => {
				console.log(`Error fetching metadata: ${err}`);
			});
	}, [src]);
	const renderPlayPauseButton: RenderPlayPauseButton = useCallback(
		({ playing, isBuffering }) => {

			console.log("playing", playing)
			console.log("isBuffering", isBuffering)
			if (playing && isBuffering) {
				return <div>P</div>;
			}

			return null;
		},
		[],
	);

	return (
		<>
			<Player
			component={MyComposition}
			durationInFrames={
			duration
			}
			ref={playerRef}
			inputProps={{
			titleText: 'Hello, world!',
			titleColor: '#000',
			logoColor: '#000',
src
			}}

			controls={true}
			alwaysShowControls={true}
			compositionHeight={720}
			compositionWidth={1280}
			fps={30}

			// renderPoster={renderPoster}
			// showPosterWhenBuffering
			renderPlayPauseButton={renderPlayPauseButton}
		/>

		</>
	);
};
