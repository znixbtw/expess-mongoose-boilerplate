interface IEnv {
	readonly NODE_ENV: 'development' | 'test' | 'production';
	readonly SERVER_PORT: number;
}

export default IEnv;
