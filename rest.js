'use strict';

exports.ok = function(values, rest){
    var data  = {
        'status':200,
        'values': values
    }
     res.json(data);
     res.end();
}