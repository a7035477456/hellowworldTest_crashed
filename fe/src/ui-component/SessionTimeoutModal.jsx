import { useCallback, useEffect, useRef, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

// project imports
import { doLogout } from 'utils/authUtils';

const IDLE_MS =
  (Number(import.meta.env.VITE_SESSION_IDLE_MINUTES) || 10) * 60 * 1000;
const WARNING_SECONDS = 60;

const ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];

// ==============================|| SESSION TIMEOUT MODAL ||============================== //
// 10-minute inactivity timer. When idle, shows a 60-second countdown popup; any activity
// or "Continue" resets the timer. If countdown reaches 0, user is truly logged out.

export default function SessionTimeoutModal() {
  const idleTimeoutRef = useRef(null);
  const warningIntervalRef = useRef(null);
  const showWarningRef = useRef(false);
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(WARNING_SECONDS);

  showWarningRef.current = showWarning;

  const performLogout = useCallback(() => {
    doLogout();
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }
    if (showWarningRef.current) {
      if (warningIntervalRef.current) {
        clearInterval(warningIntervalRef.current);
        warningIntervalRef.current = null;
      }
      setShowWarning(false);
      setCountdown(WARNING_SECONDS);
    }
    idleTimeoutRef.current = setTimeout(() => {
      idleTimeoutRef.current = null;
      setShowWarning(true);
      setCountdown(WARNING_SECONDS);
    }, IDLE_MS);
  }, []);

  const handleContinue = useCallback(() => {
    resetIdleTimer();
  }, [resetIdleTimer]);

  // Start 10-minute idle timer and listen for activity
  useEffect(() => {
    resetIdleTimer();
    const onActivity = () => resetIdleTimer();
    ACTIVITY_EVENTS.forEach((ev) => window.addEventListener(ev, onActivity));
    return () => {
      ACTIVITY_EVENTS.forEach((ev) => window.removeEventListener(ev, onActivity));
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (warningIntervalRef.current) clearInterval(warningIntervalRef.current);
    };
  }, [resetIdleTimer]);

  // When warning is shown, run 60-second countdown; logout at 0
  useEffect(() => {
    if (!showWarning) return;
    warningIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (warningIntervalRef.current) {
            clearInterval(warningIntervalRef.current);
            warningIntervalRef.current = null;
          }
          performLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (warningIntervalRef.current) {
        clearInterval(warningIntervalRef.current);
        warningIntervalRef.current = null;
      }
    };
  }, [showWarning, performLogout]);

  return (
    <Dialog open={showWarning} disableEscapeKeyDown aria-labelledby="session-timeout-title">
      <DialogTitle id="session-timeout-title">Session Timeout</DialogTitle>
      <DialogContent>
        <Typography>
          You are being timed out due to inactivity. Please choose to stay signed in or to log off. Otherwise, you
          will be logged off automatically.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 2, pb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleContinue}>
          Continue ({countdown})
        </Button>
      </DialogActions>
    </Dialog>
  );
}
