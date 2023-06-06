import React, { useEffect, useState } from 'react';
import { getAllRides, deleteRide, duplicateRide } from './../../services/rideService'; // Replace with your actual API functions
import { getToken } from './../../services/authService'; // Replace with your actual API functions
import AuthenticatedLayout from './../../components/AuthenticatedLayout';
import Table from './../../components/Table';
import ConfirmationDialog from './../../components/ConfirmationDialog';
import { toast } from 'react-toastify';
import './BookedRides.css';

function BookedRides() {
    const [rides, setRides] = useState([]);
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(true);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [actionType, setActionType] = useState('');
    const [rideId, setRideId] = useState('');

    useEffect(() => {
        // Fetch the booked rides from the backend API
        fetchBookedRides();
    }, []);

    const fetchBookedRides = async () => {
        try {
            const rides = await getAllRides(getToken());
            setRides(rides);
        } catch (error) {
            toast.error('An error occurred: ' + error.message);
            console.log('Error fetching booked rides:', error);
        }
    };

    const handleAction = (rideId, type) => {
        setRideId(rideId);
        setActionType(type);
        setConfirmDialog(true);
    };

    const confirmAction = async () => {
        try {
            if (actionType === 'duplicate') {
                const duplicatedRide = await duplicateRide(rideId, getToken());
                console.log('Ride duplicated:', duplicatedRide);
                toast.success('Ride duplicated');
                fetchBookedRides();
            } else if (actionType === 'delete') {
                await deleteRide(rideId, getToken());
                fetchBookedRides();
                console.log('Ride deleted successfully.');
                toast.success('Ride deleted successfully.');
            }
        } catch (error) {
            console.error('Error performing action:', error);
            toast.error('An error occurred: ' + error.message);
        }
        resetActionState();
    };

    const resetActionState = () => {
        setRideId('');
        setActionType('');
        setConfirmDialog(false);
    };


    const handleViewOnMap = (ride) => {
        if (googleMapsLoaded) {
            // Display the pickup and drop locations on the map using the Google Maps API
            const pickupLocation = ride.pickupLocation;
            const dropLocation = ride.dropLocation;

            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: pickupLocation.lat, lng: pickupLocation.long },
                zoom: 12,
            });

            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer({
                map,
            });

            const pickupMarker = new window.google.maps.Marker({
                position: { lat: pickupLocation.lat, lng: pickupLocation.long },
                map,
                title: 'Pickup Location',
            });

            const dropMarker = new window.google.maps.Marker({
                position: { lat: dropLocation.lat, lng: dropLocation.long },
                map,
                title: 'Drop Location',
            });

            const request = {
                origin: new window.google.maps.LatLng(pickupLocation.lat, pickupLocation.long),
                destination: new window.google.maps.LatLng(dropLocation.lat, dropLocation.long),
                travelMode: window.google.maps.TravelMode.DRIVING,
            };

            directionsService.route(request, (response, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(response);
                    const route = response.routes[0];
                    const leg = route.legs[0];

                    const distance = leg.distance.text;
                    const duration = leg.duration.text;

                    const infoWindow = new window.google.maps.InfoWindow({
                        content: `<strong>Distance:</strong> ${distance}<br/><strong>Estimated Time:</strong> ${duration}`,
                    });

                    infoWindow.open(map, dropMarker);
                } else {
                    toast.error('Error retrieving directions: ' + status);
                    console.error('Error retrieving directions:', status);
                }
            });
        } else {
            toast.error('Google Maps API is still loading. Please try again later.');
        }
    };

    const handleDuplicateRide = async (rideId) => {
        try {
            const duplicatedRide = await duplicateRide(rideId, getToken());
            console.log('Ride duplicated:', duplicatedRide);
            toast.success('Ride duplicated');
            fetchBookedRides();
            // Perform any additional actions or update the UI as needed
        } catch (error) {
            toast.error('An error occurred: ' + error.message);
            console.error('Error duplicating ride:', error);

            // Handle the error and display an error message to the user
        }
    };

    const initializeMap = () => {
        // Initialize the Google Map
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 37.7749, lng: -122.4194 }, // Replace with your desired map center coordinates
            zoom: 12, // Adjust the zoom level as needed
        });

        // Display markers for each ride on the map
        rides.forEach((ride) => {
            const marker = new window.google.maps.Marker({
                position: { lat: ride.pickupLocation.lat, lng: ride.pickupLocation.long },
                map,
                title: ride.passengerName,
            });

            // Add a click event listener to the marker to display the ride details
            marker.addListener('click', () => {
                console.log('Ride details:', ride);
            });
        });
    };

    const handleDeleteRide = async (rideId) => {
        // Implement logic to delete a ride
        try {
            await deleteRide(rideId, getToken());
            setRides(rides.filter((ride) => ride.id !== rideId));
            console.log('Ride deleted successfully.');
            toast.success('Ride deleted successfully.');
        } catch (error) {
            console.log('Error deleting ride:', error);
            toast.error('An error occurred: ' + error.message);
        }
    };

    return (
        <AuthenticatedLayout>
            <div>
                <h2>Booked Rides</h2>

                {rides.length > 0 ? (
                    <Table data={rides} columns={[
                        { key: 'pickupLocation.address', header: 'Pickup Location' },
                        { key: 'dropLocation.address', header: 'Drop Location' },
                        { key: 'passengerName', header: 'Passenger Name' },
                        { key: 'numberOfPassengers', header: 'Number Of Passengers' },
                    ]} onViewOnMap={handleViewOnMap} onAction={handleAction} />
                ) : (
                    <p>No booked rides found.</p>
                )}


                <div id="map" className="map-container"></div>

                <ConfirmationDialog
                    isOpen={confirmDialog}
                    message={`Are you sure you want to ${actionType === 'duplicate' ? 'duplicate' : 'delete'} this ride?`}
                    onConfirm={confirmAction}
                    onCancel={resetActionState}
                />
            </div>
        </AuthenticatedLayout>
    );
}

export default BookedRides;
