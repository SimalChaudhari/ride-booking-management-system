import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthenticatedLayout from './../../components/AuthenticatedLayout';
import Button from './../../components/Button';
import { getToken } from './../../services/authService';
import { createRide } from './../../services/rideService';
import { toast } from 'react-toastify';
import './BookingForm.css';
import $ from 'jquery'

// Define the validation schema using yup
const schema = yup.object().shape({
    pickupLocation: yup.string().required('Pickup location is required.'),
    dropLocation: yup.string().required('Drop location is required.'),
    passengerName: yup.string().required('Passenger name is required.'),
    numberOfPassengers: yup
        .number()
        .required('Number of passengers is required.')
        .min(1, 'Number of passengers must be at least 1.'),
});

function BookingForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema), // Use yup for form validation
    });

    const [submitting, setSubmitting] = useState(false);
    const [pickupLocation, setPickupLocation] = useState(null);
    const [dropLocation, setDropLocation] = useState(null);

    const autoCompletePickupRef = useRef();
    const autoCompleteDropupRef = useRef();

    const inputPickupLocationRef = useRef();
    const inputDropLocationRef = useRef();

    useEffect(() => {
        autoCompletePickupRef.current = new window.google.maps.places.Autocomplete(
            inputPickupLocationRef.current,
            { types: ['establishment'] }
        );

        autoCompleteDropupRef.current = new window.google.maps.places.Autocomplete(
            inputDropLocationRef.current,
            { types: ['establishment'] }
        );

        autoCompletePickupRef.current.addListener('place_changed', () => {
            const place = autoCompletePickupRef.current.getPlace();
            const { geometry, formatted_address } = place;
            const { lat, lng } = geometry.location;
            console.log(formatted_address)
            handlePickupLocationSelect(lat(), lng(), formatted_address);
        });

        autoCompleteDropupRef.current.addListener('place_changed', () => {
            const place = autoCompleteDropupRef.current.getPlace();
            const { geometry, formatted_address } = place;
            console.log(formatted_address)
            const { lat, lng } = geometry.location;
            handleDropLocationSelect(lat(), lng(), formatted_address);
        });
    }, []);

    useEffect(() => {
        $(document).ready(function() {
            var $input = $('.form-input');
        
            $input.focusout(function() {
                if($(this).val().length > 0) {
                    $(this).addClass('input-focus');
                    $(this).next('.form-label').addClass('input-focus-label');
                }
                else {
                $(this).removeClass('input-focus');
                    $(this).next('.form-label').removeClass('input-focus-label');
                    
                }
            });
        });
    }, [])

    const handlePickupLocationSelect = (lat, lng, address) => {
        setPickupLocation({
            lat: lat,
            long: lng,
            address: address,
        });
        setValue('pickupLocation', address);
    };

    const handleDropLocationSelect = (lat, lng, address) => {
        setDropLocation({
            lat: lat,
            long: lng,
            address: address,
        });
        setValue('dropLocation', address);
    };

    const onSubmit = async (data) => {
        setSubmitting(true);
        const formData = {
            pickupLocation,
            dropLocation,
            passengerName: data.passengerName,
            numberOfPassengers: data.numberOfPassengers
        };
        // Call backend API with formData
        console.log(formData);
        const createRideData = await createRide(formData, getToken());
        toast.success('Ride created successfully.');
        setSubmitting(false);
        // Reset the form values
        // Clear the pickup location field
        if (inputPickupLocationRef.current) {
            inputPickupLocationRef.current.value = '';
        }
        if (inputDropLocationRef.current) {
            inputDropLocationRef.current.value = '';
        }
        setValue('pickupLocation', '');
        setValue('dropLocation', '');
        setValue('passengerName', '');
        setValue('numberOfPassengers', '');
    };

    return (
        <AuthenticatedLayout>
            <div  className="booking-form-container">
                <div>
                    <h2 className="booking-form-h2">Book a Ride</h2>
                    <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                        <input ref={inputPickupLocationRef} class="form-input" placeholder="" />
                        <label htmlFor="pickupLocation" class="form-label">Pickup Location*</label>
                            {errors.pickupLocation && (
                                <p className="error">{errors.pickupLocation.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                        <input ref={inputDropLocationRef} class="form-input" placeholder="" />
                            <label htmlFor="dropLocation" class="form-label">Drop Location*</label>
                            {errors.dropLocation && (
                                <p className="error">{errors.dropLocation.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                        <input type="text" id="passengerName" class="form-input" {...register('passengerName')} />
                        <label htmlFor="passengerName" class="form-label">Passenger Name*</label>
                            {errors.passengerName && (
                                <p className="error">{errors.passengerName.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <input
                                class="form-input" 
                                type="number"
                                id="numberOfPassengers"
                                {...register('numberOfPassengers')}
                            />
                            <label htmlFor="numberOfPassengers" class="form-label">Number of Passengers*</label>
                            {errors.numberOfPassengers && (
                                <p className="error">{errors.numberOfPassengers.message}</p>
                            )}
                        </div>
                        
                        <div className='btn-container'>
                            <Button
                                addClass="btn-book"
                                type="submit"
                                disabled={submitting} // Disable the button while submitting
                                text={submitting ? 'Submitting...' : 'Book Now'}
                            ></Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default BookingForm;
