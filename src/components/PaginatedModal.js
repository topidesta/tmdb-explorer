import React, { useState, useEffect } from "react";
import { MobileStepper, Button, Typography } from "@material-ui/core";
import BaseDialog from "components/BaseDialog";
import { useTheme } from "@material-ui/styles";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import useHistoryPush from "hooks/useHistoryPush";

function PaginatedModal({
  title,
  isOpen,
  nextPath,
  previousPath,
  returnPath,
  steps,
  activeStep,
  children
}) {
  const theme = useTheme();
  const historyPush = useHistoryPush();
  const [isVisible, setIsVisible] = useState(isOpen);

  function handleClose() {
    setIsVisible(false);
  }

  function handleExited() {
    historyPush(returnPath, { keepScrollState: true });
  }

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  return (
    <BaseDialog
      title={
        title ? (
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        ) : (
          ""
        )
      }
      open={isVisible}
      onClose={handleClose}
      onExited={handleExited}
      zeroPaddingContent
    >
      {children}
      <MobileStepper
        steps={steps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            disabled={!nextPath}
            onClick={() =>
              historyPush(nextPath, {
                keepScrollState: true
              })
            }
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            disabled={!previousPath}
            onClick={() =>
              historyPush(previousPath, {
                keepScrollState: true
              })
            }
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </BaseDialog>
  );
}

export default PaginatedModal;
