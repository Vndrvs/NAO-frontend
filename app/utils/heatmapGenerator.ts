// heatmap generator (two-phased color range, blue -> yellow, yellow -> red)

type RGBColor = {
	red: number;
	green: number;
	blue: number;
}

const colorBlue: RGBColor = {
	red: 48,
	green: 173,
	blue: 255
};

const colorYellow: RGBColor = {
	red: 245,
	green: 150,
	blue: 0
};

const colorRed: RGBColor = {
	red: 246,
	green: 79,
	blue: 20
};

export const interpolate = (a: number, b: number, t: number) => {
	return a + (b - a) * t;
};

const interpolateToRGB = (c1:RGBColor, c2: RGBColor, t: number) => ({
	red: interpolate(c1.red, c2.red, t),
	green: interpolate(c1.green, c2.green, t),
	blue: interpolate(c1.blue, c2.blue, t),
});

export const getChenColor = (currentScore: number, scores: number[][]): RGBColor => {
	
	// get all scores that exist in our palette, check the highest and lowest ones
	const allScores = scores.flat();
	const minScore = Math.min(...allScores)
	const maxScore = Math.max(...allScores)

	if (maxScore === minScore) {
		return interpolateToRGB(colorYellow, colorYellow, 0);
	}
	
	// normalize score range to: 0 - weakest, 1 - strongest
	const normalized = Math.min(
		1,
		Math.max(0, (currentScore - minScore) / (maxScore - minScore))
	);
	
	if (normalized < 0.5) {
		const phasedTemperature = normalized / 0.5
		return interpolateToRGB(colorBlue, colorYellow, phasedTemperature);
		
	} else {
		const phasedTemperature = (normalized - 0.5) / 0.5
		return interpolateToRGB(colorYellow, colorRed, phasedTemperature);
	}
};