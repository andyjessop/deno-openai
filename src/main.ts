import { dotenv, flags, openai } from './deps.ts';

main();

async function main() {
	const args = flags.parse(Deno.args);
	const config = await dotenv.load();
	const ai = new openai.OpenAI(config.OPENAI_API_KEY);

	const model = args.model ?? 'text-davinci-003';
	const prompt = args.prompt ?? 'Write a haiku about the weather.';
	const temperature = args.temperature ?? 0;
	const maxTokens = args.maxTokens ?? 50;

	console.info('Creating a completion with parameters:');
	console.info('----------------------------------');
	console.info(`model: ${model}`);
	console.info(`prompt: ${prompt}`);
	console.info(`temperature: ${temperature}`);
	console.info(`maxTokens: ${maxTokens}`);
	console.info('----------------------------------\n');

	const completion = await ai.createCompletion({
		model,
		prompt,
		temperature,
		maxTokens,
	});

	console.log(completion);
}
