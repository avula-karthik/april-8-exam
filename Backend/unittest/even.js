const even = (req, res) => {
    let count = 0;
    let result = 12;
    sum = 0;
    for (let i = 1; count < 3; i++) {
        if (i % 2 == 0) {
            sum += i;
            count += 1;
        } else {
        }
    }
    if (sum == result) {
        res.json({ output: sum, msg: 'All test cases passed' });
    } else {
        res.json({ output: sum, msg: 'Sum is not 12' });
    }
};
module.exports = even;
