
function task1(arr) {
    function sortNumberArray(arr)
    {
        arr.sort(function (a, b) {
            return a - b;
          });
        return arr;
    }
    return sortNumberArray(arr);
}