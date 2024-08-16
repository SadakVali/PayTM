import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms/balanceAtom";

export const useBalance = () => {
  const value = useRecoilValue(balanceAtom);
  return value;
};
