var gulp=require("gulp");

gulp.task("Copy-dist-to-wwwroot",()=>{
    return gulp.src("./dist/task-manager/**/*")
                .pipe(gulp.dest("D:\\DemoProjects\\angular\\MvcTaskManager\\MvcTaskManager\\wwwroot"));
});

gulp.task("default",()=>{
    gulp.watch("./dist/task-manager",gulp.series("Copy-dist-to-wwwroot"));
});