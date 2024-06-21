module.exports = function(grunt){
	process.removeAllListeners('warning');
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var gc = {},
		pkg = grunt.file.readJSON('package.json'),
		path = require('path'),
		uniqid = function () {
			let result = URL.createObjectURL(new Blob([])).slice(-36).replace(/-/g, '');
			return result;
		};
	function getTasks() {
		switch(process.env.GRUNT_TASK){
			default:
				return [
					'imagemin',
					'pug'
				];
		}
	}
	grunt.initConfig({
		globalConfig : gc,
		pkg : pkg,
		imagemin: {
			files: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'page/images/*.{png,jpg,gif}'
						],
						dest: 'docs/images/',
						filter: 'isFile'
					}
				],
			}
		},
		pug: {
			files: {
				options: {
					pretty: '\t',
					separator:  '\n',
					data: function(dest, src) {
						return {
							"hash": uniqid(),
							"repo": "projectsoft-studionions.github.io",
							"userName": "ProjectSoft-STUDIONIONS",
							"page": "widget-help",
							"download": "widget-help.zip",
							"title": "Виджет плагин помощи для контент менеджера Evolution CMS | ProjectSoft GitHub Pages",
							"h1title": "Виджет плагин помощи для контент менеджера Evolution CMS",
							"description": "Ресурс находится в защищённом разделе разработчика и редактируется только администратором. Страница помечена как «не опубликованна» и поэтому в поиск она не попадёт. Естественно, для данной страницы так же используется SEO оптимизация для запрета от индекса.",
							"keywords": "ProjectSoft, STUDIONIONS, ProjectSoft-STUDIONIONS, widget-help, Evolution CMS, Плагин Помощи",
							"nickname": "ProjectSoft",
							"logotype": "projectsoft.png",
							"copyright": "2008 - all right reserved",
							"open_graph": {
								"image_16x9": "widget-help.png",
								"image_16x9_width": "1918",
								"image_16x9_height": "965",
								"image_1x1": "widget-help-400.png",
								"image_1x1_width": "400",
								"image_1x1_height": "201",
							}
						}
					}
				},
				files: {
					"docs/index.html": ['page/pug/index.pug'],
				}
			}
		},
	});
	grunt.registerTask('default', getTasks());
}