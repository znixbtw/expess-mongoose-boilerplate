interface IConfig {
	env: 'development' | 'test' | 'production';
	server: {
		port: number;
	};
}

export default IConfig;
