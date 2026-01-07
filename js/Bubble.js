import { Draw, Read, sortList, Swap } from "./utils.js";
let bubbleSortGenerator;
function* bubbleSortMain(speed) {
    let i, count = 0;
    for (let j = 0; j < sortList.length; j++) {
        i = 0;
        while (i < sortList.length - j - 1) {
            if (Read(i) > Read(i + 1)) {
                Swap(i, i + 1);
            }
            if (count++ % speed == 0) {
                yield i;
            }
            i++;
        }
        if (count++ % speed == 0) {
            yield i;
        }
    }
}
function BubbleSort(IsStart) {
    if (IsStart) {
        bubbleSortGenerator = bubbleSortMain(IsStart);
    }
    const resp = bubbleSortGenerator.next();
    if (resp.value != undefined) {
        Draw(resp.value);
    }
    else {
        Draw();
    }
    if (resp.done) {
        return;
    }
    requestAnimationFrame(() => BubbleSort(false));
}
export { BubbleSort };
