import React, { useState } from 'react';
import {
  SideSheet,
  Paragraph,
  Button,
  Pane,
  Text,
  Card,
  Heading,
} from 'evergreen-ui';

function Betslip({ checkedBets, removeBet }) {
  const [isShow, setShow] = useState(false);

  return (
    <>
      <SideSheet
        width={300}
        isShown={isShow}
        onCloseComplete={() => setShow(false)}
        preventBodyScrolling
      >
        {checkedBets.length === 0 ? (
          <Paragraph>No bets</Paragraph>
        ) : (
          <Pane
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {checkedBets.map(item => (
              <Card
                key={item.betId}
                width="90%"
                background="greenTint"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                marginTop={15}
              >
                <Heading is="h3" paddingTop={10}>
                  {item.betName} - {item.marketName}
                </Heading>
                <Text size={600} paddingTop={10} paddingBottom={10}>
                  {item.betPrice}
                </Text>
                <Button
                  intent="danger"
                  marginBottom={20}
                  iconBefore="ban-circle"
                  appearance="minimal"
                  onClick={() => removeBet(item.betId)}
                >
                  Remove Bet
                </Button>
              </Card>
            ))}
          </Pane>
        )}
      </SideSheet>

      <Pane display="flex" alignItems="right" justifyContent="flex-end">
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
