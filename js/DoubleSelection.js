import { Read, Swap, Draw, sortList } from "./utils.js";
let doubleSelectionSortGenerator;
function* doubleSelectionSortMain(speed) {
    let i = 0, j, k, l, count = 0;
    while (i < Math.floor(sortList.length / 2)) {
        j = i;
        k = i;
        l = i;
        while (k <= sortList.length - i - 1) {
            if (Read(k) < Read(j)) {
                j = k;
            }
            if (Read(k) > Read(l)) {
                l = k;
            }
            if (count++ % speed == 0) {
                yield [j, k, l];
            }
            k++;
        }
        Swap(i, j);
        if (i == l) {
            if (j != sortList.length - i - 1) {
                Swap(sortList.length - i - 1, j);
            }
        }
        else {
            Swap(sortList.length - i - 1, l);
        }
        i++;
        if (count++ % speed == 0) {
            yield;
        }
    }
}
function DoubleSelectionSort(IsStart) {
    if (IsStart) {
        doubleSelectionSortGenerator = doubleSelectionSortMain(IsStart);
    }
    const resp = doubleSelectionSortGenerator.next();
    if (resp.value != undefined) {
        Draw(resp.value[0], resp.value[1], resp.value[2]);
    }
    else {
        Draw();
    }
    if (resp.done) {
        return;
    }
    requestAnimationFrame(() => DoubleSelectionSort(false));
}
export { DoubleSelectionSort };
