import React, { useState } from 'react';
import { SideSheet, Paragraph, Button, Pane } from 'evergreen-ui';

function Betslip() {
  const [isShow, setShow] = useState(false);
  return (
    <>
      <SideSheet
        isShown={isShow}
        onCloseComplete={() => setShow(false)}
        preventBodyScrolling
      >
        <Paragraph margin={40}>No bets</Paragraph>
      </SideSheet>

      <Pane display="flex" alignItems="right" justifyContent="right">
        <Button
          onClick={() => setShow(true)}
          data-testid="betmenu"
          appearance="minimal"
          iconAfter="caret-right"
        >
          See Bets
        </Button>
      </Pane>
    </>
  );
}

export default Betslip;
