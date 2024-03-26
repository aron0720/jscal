var list = [];
var cal = [];
var count = 0;

function print(a) {
    var i = 0, temp = '';
    for (i; i< a.length; i++) {
        temp += a[i];
    }
    return temp;
}

function isnumber (a) {
    if (isNaN(a) == false) {
        return 1;
    } else{
        return 0;
    }
}

function initialization () {
    list = [];
    document.getElementById("output").innerHTML = '';
}

function insert (a) {
    if (a == '/' || a == 'x' || a == '+' || a == '-') {
        if (list[list.length-1] == '/' || list[list.length-1] == 'x' || list[list.length-1] == '+' || list[list.length-1] == '-') {
            list.pop();
        }
    }
    list.push(a);
    document.getElementById("output").innerHTML = print(list);
}

function del () {
    list.pop();
    document.getElementById("output").innerHTML = print(list);
}

function get () {
    var temp = 0;
    if (isnumber(list[count]) == 1) {
        while (isnumber(list[count]) == 1) {
            cal[temp] = list[count];
            count++;
            temp++;
        }
    } else {
        cal[temp] = list[count];
        count++;
        temp++;
    }

}

function calc () {
    count = 0;
    var result = 0;

    while (count < list.length) {
        get();
        result = level1();

    }

    document.getElementById("output").innerHTML = result;
    cal=[];
    list=[result];

    return 0;
}


function level1() {
    var result = 0;
    var hold;
    result = level2();

    var op = cal[0];
    while (op == '+' || op == '-') {
        get();
        hold = level2();
        result = arith(op, result, hold);
        op = '';
    }
    return result;
}

function level2() {
    var result = 0;
    var hold;
    result = level3();

    var op = cal[0];
    while (op == 'x' || op == '/') {
        get();
        hold = level3();
        result = arith(op, result, hold);
        op = '';
    }

    return result;
}

function level3() {
    var result = 0;
    result = level4();

    var op = cal[0];
    while (op == '%') {
        get();
        result = result/100;
        op = '';
    }

    return result;
}

function level4() {
    var result = 0;
    var hold;
    result = level5();

    var op = cal[0];
    while (op == '.') {
        get();
        hold = level5();
        result = arith(op, result, hold);
        op = '';
    }

    return result;
}

function level5() {
    var result = 0;
    while (cal[0] == '+' || cal[0] == '-') {
        var op = cal[0];
        get();
    }

    result = level6();
    if (op == '-') { 
        result = -(result);
    }

    op = '';

    return result;
}

function level6() {
    var result = 0;

    if (cal[0] == '(') {
        var op = cal[0];
        get();
        result = level1();
        get();
    } else {
        result = intiger();
    }

    return result;
}

function arith (x, y, z) {
    var result;
    switch (x) {
        case '+':
            return z + y;
        case '-':
            return y - z;
        case 'x':
            return y * z;
        case '/':
            return y / z;
        case '.':
            while (z>=1) {
                z = z / 10
            }
            return y + z;
    }
}

function intiger () {
    var result = 0;

    if (isnumber(cal[0]) == 1) {
        for (var i = 0; i <= cal.length-1; i++) {
            var temp = 0;
            temp = cal[i];
    
            for (var j = 1; j < cal.length-i; j++) {
                temp *= 10;
            }
    
            result += temp;
        }
    } else {
        for (var i = 1; i <= cal.length-1; i++) {
             var temp = 0;
             temp = cal[i];

            for (var j = 1; j < cal.length-i-1; j++) {
                temp *= 10;
            }

            result += temp;
        }
    }
    cal = [];
    get();
    return result;
}