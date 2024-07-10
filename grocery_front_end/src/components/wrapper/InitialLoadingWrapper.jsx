import { useDispatch, useSelector } from "react-redux";
import BackdropLoading from "../../utils/BackdropLoading";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { getRefreshToken } from "../../services/authencate/token";
import { createHeader, handleExceptionView, handleRedirectHome } from "../../utils/commonUtils";
import { fetchProfile } from "../../slice/person/profile";
import { constLogin, SCREEN_THEME_MODE } from "../../utils/commonConstants";

const InitialLoadingWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const getUserDataRef = useRef();
  const { profile } = useSelector(state => state.profile)
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(false);
    }, 1000); // 2 seconds delay
    return () => clearTimeout(timer); // Clean up the timer
  }, []);
  const handleRefreshToken = useCallback(async () => {
    try {
      const response = await getRefreshToken(localStorage.getItem(constLogin.ACCESS_TOKEN))
      localStorage.setItem(constLogin.ACCESS_TOKEN, response.accessToken)
      getUserDataRef.current();

    } catch (error) {
      localStorage.removeItem(constLogin.ACCESS_TOKEN);
      handleRedirectHome()
    }
  }, [])
  const getUserData = useCallback(async () => {
    try {
      await dispatch(fetchProfile(createHeader())).unwrap();
    } catch (error) {
      handleExceptionView({code:error?.status,handleRefreshToken:handleRefreshToken})
    }
  }, [dispatch, handleRefreshToken])

  useEffect(() => {
    if (localStorage.getItem(constLogin.ACCESS_TOKEN) !== null) {
      getUserData(localStorage.getItem(constLogin.ACCESS_TOKEN));
    }
  }, [getUserData])
  return (
    <>
      <div className={profile?.screenTheme === SCREEN_THEME_MODE.SCREEN_LIGHT.alias ? ('light') : ('dark')} style={{ visibility: hidden ? 'hidden' : 'visible' }}>
        {children}
      </div>
      {hidden && (
        <BackdropLoading />
      )}
    </>
  )
}
export default memo(InitialLoadingWrapper);