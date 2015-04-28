module.exports = function (grunt) {
    //定义变量
    var path={
        src:"",
        dist:"build"
    }
    //编写Tasks
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        path:path,
        banner:'/*\n' +
            '* version:V<%=pkg.version%>' +
            '*/',
        /*Tasks start*/
        clean:{
            tmp:{
                src:['.tmp/']
            },
            dist:{
                src:['<%=path.dist%>/**/*']
            }
        },
        useminPrepare:{
            html: ['*.html'],
            options:{
                dest:"build"
            }
        },
        less:{
            compileCore:{
                options:{
                    sourceMap:true,
                    sourceMapURL:'ui.css.map',
                    sourceMapFilename: 'css/ui.css.map'
                },
                files:[
                    {'css/ui.css':'css/ui.less'}
                ]
            },
            skin:{
                options:{
                    //sourceMap:true
                },
                files:[
                    {'css/theme/blue.css':'css/theme/blue.less'},
                    {'css/theme/mint.css':'css/theme/mint.less'},
                    {'css/theme/pink.css':'css/theme/pink.less'},
                    {'css/theme/purple.css':'css/theme/purple.less'},
                    {'css/theme/white.css':'css/theme/white.less'}
                ]
            }
        },
        copy:{
            html:{
                expand:true,
                cwd:'<%= path.src %>',
                src:['*.html'],
                dest:'<%= path.dist %>/'
            },
            libs:{
                expand:true,
                cwd:'libs',
                src:['**/*'],
                dest:'<%= path.dist %>/libs'
            },
            js:{
                expand:true,
                cwd:'js/',
                src:'{3y.utils,frame}.js',
                dest:'<%= path.dist %>/js/'
            },
            css:{
                expand:true,
                src:'css/**/*.{css,map,png,jpg,gif}',
                dest:'<%= path.dist %>/'
            },
            images:{
                expand:true,
                src:'images/**/*',
                dest:'<%= path.dist %>/'
            }
        },
        concat:{
            libs:{
                src:[
                    'js/jquery-2.0.3.js',
                    'js/jquery-cookie.js',
                    'js/jquery.parsequery.js'
                ],
                dest:'<%= path.dist %>/js/libs.js'
            }
        },
        uglify:{
            libs:{
                files: [{
                    expand: true,
                    cwd: '<%= path.dist %>/js/',
                    src: '**/*.js',
                    dest: '<%= path.dist %>/js/'
                }]
            }
        },
        usemin:{
            options:{
                assetsDirs:['build']
            },
            html:['<%= path.dist %>/*.html'],
            css:{
                options:{
                  assetsDirs:['<%= path.dist %>/css/**']
                },
                src:['<%= path.dist %>/css/**/*.css']
            }
        },
        filerev:{
            options: {
              algorithm: 'md5',
              length: 4
            },
            images:{
                expand:true,
                cwd:'<%= path.dist %>/css/',
                src:'**/*.{png,jpg,jpeg,gif}',
                dest:'<%= path.dist %>/css/'
            },
            css:{
                expand:true,
                //mathchBase:true,
                cwd:'<%= path.dist %>/css/',
                src:['*.css'],
                dest:'<%= path.dist %>/css/'
            },
            js:{
                expand:true,
                cwd:'<%= path.dist %>/js/',
                src:['*.js'],
                dest:'<%= path.dist %>/js/'
            }
        },
        htmlmin:{
            htmls:{
                options: {
                    minifyJS:true,
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                    'build/index.html' : 'build/index.html',
                    'build/button.html' : 'build/button.html',
                    'build/form.html' : 'build/form.html',
                    'build/panel.html' : 'build/panel.html',
                    'build/table.html' : 'build/table.html',
                    'build/test.html' : 'build/tpl_test.html'
                }
            }
        }
    });
    //自动加载package.json里的依赖
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    require('time-grunt')(grunt);
    //注册Tasks
    grunt.registerTask('default',['less']);
    grunt.registerTask('test',[
        'less',
        'clean',
        'copy',
        'useminPrepare',
        'concat',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'clean:tmp'
    ]);

};