import {AbsoluteFill, Video} from 'remotion';
import {Logo} from './Logo';
import {Subtitle} from './Subtitle';
import {Title} from './Title';
import {z} from 'zod';
import {zColor} from '@remotion/zod-types';

export const myCompSchema = z.object({
	titleText: z.string(),
	src: z.string(),
	titleColor: zColor(),
	logoColor: zColor(),
});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
	titleText: propOne,
	titleColor: propTwo,
	logoColor: propThree,
	src,
}) => {
	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center">
		<Video
			pauseWhenBuffering
			src={src}
		/>
		</AbsoluteFill>
	);
};
