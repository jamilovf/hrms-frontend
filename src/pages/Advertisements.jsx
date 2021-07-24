import React, { useState,useEffect } from 'react'
import { Button, Card} from 'semantic-ui-react'
import AdvertisementService from '../services/advertisementService';

export default function Advertisements() {
    const [advertisements, setAdvertisements] = useState([]);

    useEffect(() => {
        let advertismentService = new AdvertisementService()
        advertismentService.getAllActiveAdvertisements().then(result=>setAdvertisements(result.data.data))
    })

    return (
        <div>
   <Card.Group>
       {advertisements.map((advertisement) => (
               <Card>
               <Card.Content>
                 <Card.Header>{advertisement.jobPosition}</Card.Header>
                 <Card.Meta>{advertisement.companyName}</Card.Meta>
                 <Card.Description>
                   Open positions: <strong>{advertisement.openPositions}</strong>
                 </Card.Description>
                 <Card.Description>
                   Application deadline: <strong>{advertisement.applicationDeadline}</strong>
                 </Card.Description>
               </Card.Content>
               <Card.Content extra>
                 <div className='ui two buttons'>
                   <Button basic color='green'>
                     Apply
                   </Button>
                 </div>
               </Card.Content>
             </Card>
       ))}

  </Card.Group>
        </div>
    )
}
