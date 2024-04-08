import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
  } from "react-redux";
  import { AppDispatch, RootState } from "../store/stateStore";
  
  type DispatchFunction = () => AppDispatch;
  
  export const useCustomDispatch: DispatchFunction = useDispatch;
  
  export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;