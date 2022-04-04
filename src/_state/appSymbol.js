import { atom } from 'recoil';

const symbolAtom = atom({
    key: 'appSymbol',
    default: 'stoned_ape_crew',
});

export { symbolAtom };