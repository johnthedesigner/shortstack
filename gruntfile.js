module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                layout: 'page.hbs',
                layoutdir: './src/templates/layouts',
                partials: './src/templates/partials/**/*.hbs',
                plugins: ['permalinks'],
                data: './src/data/testdata.json'
            },
            site: {
                files: [{
                    cwd: './src/views/',
                    dest: './dist/',
                    expand: true,
                    src: '**/*.hbs'
                }]
            }
        },
        stylus: {
            development: {
                options: {
                    compress: true,
                    paths: ['./src/styles/']
                },
                files: {
                    "./dist/styles/styles.css": "./src/styles/**/*.styl"
                }
            }
        },
        concat: {
            dist: {
                src: ['./src/scripts/**/*.js'],
                dest: './dist/scripts/scripts.js'
            }
        },
        jshint: {
            beforeconcat: ['./src/scripts/**/*.js'],
            afterconcat: ['./dist/scripts/**/*.js']
        },
        watch: {
            templates: {
                files: ['**/*.hbs','./src/**/*.js','./src/**/*.styl','./src/**/*.css'],
                tasks: ['assemble','stylus','concat','jshint'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
        },
		connect: {
			server: {
				options: {
					livereload:true,
					open: true,
					hostname:'localhost',
					base:'./dist/'
				}
			}
		},
		run: { // Run Admin Server
		    server: {
				args: ['./admin/index.js'],
				options: {
					passArgs: [
						'port'
					]
				}
		    }
		}
	});

    // Load handlebars template compiler
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Set up task(s).
    grunt.registerTask('default', ['assemble','stylus','concat','jshint']);
    grunt.registerTask('serve', ['assemble','stylus','concat','jshint','connect','watch']);

};