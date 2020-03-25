module.exports = {
	base: '',
	title: '🎆秋的知识管理站',
	description: 'Qiu knowledge management',
	themeConfig: {
		repo: 'https://github.com/aschenmaker/knowledge-management',
		repoLabel: 'GitHub',
		nav: require('./nav'),
		sidebarDepth: 2,
		lastUpdated: '上次更新',
		searchMaxSuggestoins: 10,
		serviceWorker: {
			updatePopup: {
				message: 'New content is available.',
				buttonText: 'Refresh'
			}
		},
		editLinks: true,
		editLinkText: '在 GitHub 上编辑此页 ！'
	},
	plugins: {
		'vuepress-plugin-auto-sidebar': {}
	}
};
