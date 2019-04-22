module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			all: ["templ.js","test/*.js"],
			options: {
				globals: {
					module: true,
					templ: true,
				},
				browser: true,
				eqeqeq: true,
				evil: true,
				jasmine: true,
				undef: true,
				unused: !true
			}
		},
		jasmine: {
			src: {
				src: "templ.js",
				options: {
					specs: "test/*-spec.js",
				}
			},
			dist: {
				src: "templ.min.js",
				options: {
					specs: "test/*-spec.js",
				}
			}
		},
		uglify: {
			options: {
				mangle: {
					eval: true,
					reserved: ["d"]
				}
			},
			dist: {
				files: {
					"templ.min.js": "templ.js"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-jasmine");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("lint", ["jshint:all"]);
	grunt.registerTask("test", ["jasmine:src"]);
	grunt.registerTask("dist", ["jshint:all","uglify:dist","jasmine:dist"]);
};
