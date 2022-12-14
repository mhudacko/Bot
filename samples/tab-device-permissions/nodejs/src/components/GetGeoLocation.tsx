// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { useEffect, useState } from 'react';
import * as microsoftTeams from "@microsoft/teams-js";
import { Card, Flex, Text, Button, CardHeader, CardBody } from '@fluentui/react-northstar'

/**
 * The 'GetGeoLocation' component
 * of your app.
 */
const GetGeoLocation = () => {
  const [geoLocationValue, setGeoLocationValue] = useState<microsoftTeams.location.Location>({} as microsoftTeams.location.Location);
  useEffect(() => {
    microsoftTeams.app.initialize()
  })

  // Method to get current user's geo location
  // If the value of allowChooseLocation is true, then the users can choose any location of their choice.
  // If the value of allowChooseLocation is false, then the users cannot change their current location.
  // If the value of showMap is false, the current location is fetched without displaying the map. 
  // showMap is ignored if allowChooseLocation is set to true.
  function getLocation() {
    microsoftTeams.location.getLocation({ allowChooseLocation: true, showMap: true }).then((location) => {
      setGeoLocationValue(location)
    }).catch((error) => {
      console.error(error);
    });
  }

  // Method to show geo location for given latitude and longitude values.
  function showLocation() {
    // Methos to ask for permission and then show current user location
    microsoftTeams.location.showLocation(geoLocationValue).catch((error) => {
      // If there's any error, an alert shows the error message/code
      if (error) {
        if (error.message) {
          alert(" ErrorCode: " + error.errorCode + error.message);
        } else {
          alert(" ErrorCode: " + error.errorCode);
        }
        return;
      }
    });
  }

  return (
    <>
      {/* Card for Get/Show Geo-Location */}
      <Card>
        <CardHeader>
          <Text content="Get Location" weight="bold" />
        </CardHeader>
        <CardBody>
          <Flex column gap="gap.small">
            <Text content="SDK used: " weight="semibold" />
            <Text content="navigator, microsoftTeams" />
            <Text content="Method: " weight="semibold" />
            <Text content="navigator.geolocation.getCurrentPosition, teams.location" />
            <Button content="Get Location" onClick={getLocation} />
            {JSON.stringify(geoLocationValue) !== '{}' &&
              <Text styles={{ "word-wrap": "break-word" }} content={JSON.stringify(geoLocationValue)}></Text>}
            <Button content="Show Location" onClick={showLocation} />
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}

export default GetGeoLocation;