import React, { useState } from 'react';
import { SideSheet, Paragraph, Button, Pane } from 'evergreen-ui';

function Betslip() {
  const [isShow, setShow] = useState(false);
  const [data, setData] = useState([]);

  function getData() {
    const bets = localStorage.getItem('bets');
    if (bets) {
      setData(JSON.parse(bets));
    }
    setShow(true);
  }

  return (
    <>
      <SideSheet
        isShown={isShow}
        onCloseComplete={() => setShow(false)}
        preventBodyScrolling
      >
        {Object.entries(data).length === 0 ? (
          <Paragraph>No bets</Paragraph>
        ) : (
          data.map(item => (
            <li className="travelcompany-input" key={item.betId}>
              <span className="input-label">{item.betName}</span>
            </li>
          ))
        )}
      </SideSheet>

      <Pane display="flex" alignItems="right" justifyContent="flex-end">
        <Button
          onClick={() => getData()}
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
