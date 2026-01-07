import { Draw, Read, sortList, Swap } from "./utils.js";
let shakerSortGenerator;
function* shakerSortMain(speed) {
    let i, j = 0, count = 0;
    while (j < Math.floor(sortList.length / 2)) {
        i = j;
        while (i < sortList.length - j - 1) {
            if (Read(i) > Read(i + 1)) {
                Swap(i, i + 1);
            }
            if (count++ % speed == 0) {
                yield i + 1;
            }
            i++;
        }
        i--;
        while (j < i) {
            if (Read(i) < Read(i - 1)) {
                Swap(i - 1, i);
            }
            if (count++ % speed == 0) {
                yield i - 1;
            }
            i--;
        }
        if (count++ % speed == 0) {
            yield i;
        }
        j++;
    }
}
function ShakerSort(IsStart) {
    if (IsStart) {
        shakerSortGenerator = shakerSortMain(IsStart);
    }
    const resp = shakerSortGenerator.next();
    if (resp.value != undefined) {
        Draw(resp.value);
    }
    else {
        Draw();
    }
    if (resp.done) {
        return;
    }
    requestAnimationFrame(() => ShakerSort(false));
}
export { ShakerSort };
