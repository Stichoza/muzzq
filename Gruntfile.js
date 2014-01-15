module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 5,
				title: "muzzq"
			}
		},
		notify: {
			sass: {
				options: {
					title: "Comapass:",
					message: "compilation complete"
				}
			},
			jsmin: {
				options: {
					title: "JavaScript:",
					message: "concat and uglify"
				}
			}
		},
		compass: {
			compile: {
				options: {
					noLineComments: true,
					sassDir: 'frontend/sass',
					cssDir: 'frontend/css',
					outputStyle: 'compressed',
					fontsDir: 'frontend/fonts',
					javascriptsDir: 'frontend/js',
					imagesDir: 'frontend/images',
					httpPath : 'frontend/'
				}
			}
		},
		concat: {
			options: {

			},
			dist: {
				src: [
					"frontend/js/youtube.js",
					"frontend/js/lastfm.js",
					"frontend/js/main.js"
				],
				dest: "frontend/js/dist/ytlfm.con.js"
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
				'frontend/js/dist/ytlfm.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		connect: {
			livereload: {
				options: {
					hostname : "*",
					livereload: true,
					base: '.',
					port: 3000,
				},
			},
			noLivereload: {
				options: {
					hostname : "*",
					livereload: false,
					base: '.',
					port: 3000,
				},
			},
			server: {
				options: {
					hostname : "*",
					port: 3000,
					keepalive: true
				}
			}
		},
		watch: {
			sass: {
				files: ['frontend/sass/*.{sass,scss}','frontend/sass/*/*.{sass,scss}'],
				tasks: ['compass'] //, 'notify:sass'
			},
			jsmin: {
				files: ['frontend/js/*.js'],
				tasks: ['concat', 'uglify'] //, 'notify:jsmin'
			},
			assets: {
				files: [
					'frontend/*.html',
					'frontend/css/*.css',
					'frontend/js/*.js',
					'frontend/img/*.*'
				],
				options: {
					livereload: true,
				},
			}
		}
	}); 

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', [
		'connect:noLivereload',
		'watch'
	]);

	grunt.registerTask('live-server', [
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('server', [
		'connect:server'
	]);

};