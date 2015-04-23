module.exports = function (grunt) {
    //编写Tasks
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        path:{
            src:"",
            dist:"build"
        },
        banner:'/*\n' +
            '* version:V<%=pkg.version%>' +
            '*/',
        /*Tasks start*/
        clean:{
            'dist':{
                src:['<%=path.dist%>/**/*']
            }
        },
        copy:{
            html:{
                expand:true,
                cwd:'<%= path.src %>/',
                src:['*.html'],
                dest:'<%= path.dist %>/'
            },
            css:{
                src:'<%= path.src %>/css/**/*.{css,map,png,jpg,gif}',
                dest:'<%= path.dist %>/'
            },
            images:{
                src:'<%= path.src %>/images/**/*',
                dest:'<%= path.dist %>/'
            }
        },
        useminPrepare:{
            html: ['<%= path.src %>/*.html'],
            options:{
                'dest':'<%= path.dist %>/'
            }
        },
        less:{
            compileCore:{
                'options':{
                    'sourceMap':true
                },
                files:{
                    '<%= path.src %>/css/ui.css':['<%= path.src %>/css/ui.less']
                }
            }
        },
        concat:{
            'libs':{
                src:[
                    'js/jquery-2.0.3.js',
                    'js/jquery-cookie.js',
                    'js/jquery.parsequery.js'
                ],
                dest:'js/dist/libs.js'
            }
        },
        usemin:{
            options:{
                'assetsDirs':['build']
            },
            html:['build/*.html'],
            css:['build/**/*.css'],
            images:['build/**/*.png']

        },
        filerev:{
            options: {
              algorithm: 'md5',
              length: 4
            },
            images:{
                expand:true,
                cwd:'css/newui/',
                src:'test.png',
                dest:'build/css/newui/'
            },
            css:{
                expand:true,
                cwd:'css/newui/',
                src:'*.css',
                dest:'build/css/newui/'
            }
        },
        htmlmin:{
            'htmls':{
                options: {
                    minifyJS:true,
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                    'build/frame.min.html' : 'build/frame.html'
                }
            }
        }
    });
    //自动加载package.json里的依赖
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    //注册Tasks
    grunt.registerTask('default',['less']);

};