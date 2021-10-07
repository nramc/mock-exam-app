const {src, dest} = require('gulp');
const del = require('del');


// Clean Parent directory's /docs directory before build
function clean(cb) {
  del(['../docs/*'], {force:true});
  cb();
};

// Copy all aretefacts from source[/dist] to destination[../docs]
function copy(cb) {
  src('./dist/mock-exam-app/**')
    .pipe(dest('./../docs/'));
  cb();
}

exports.copy = copy;
exports.clean = clean;
exports.default = clean;
