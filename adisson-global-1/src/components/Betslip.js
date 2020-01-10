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
          Object.keys(data).map((item, i) => (
            <li className="travelcompany-input" key={i}>
              <span className="input-label">{[item][i]}</span>
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
