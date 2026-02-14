'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        message: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        service: ''
    })

    const [validFields, setValidFields] = useState({
        name: false,
        phone: false
    })

    // UI state while sending email
    const [sending, setSending] = useState(false)

    // Validate name: minimum 3 alphabets, no numbers
    const validateName = (value: string) => {
        const nameRegex = /^[a-zA-Z\s]{3,}$/
        return nameRegex.test(value)
    }

    // Validate phone: minimum 11 digits
    const validatePhone = (value: string) => {
        const digitsOnly = value.replace(/\D/g, '')
        return digitsOnly.length >= 11
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFormData(prev => ({ ...prev, name: value }))

        if (!value) {
            setErrors(prev => ({ ...prev, name: '' }))
            setValidFields(prev => ({ ...prev, name: false }))
        } else if (!validateName(value)) {
            setErrors(prev => ({ ...prev, name: 'Name must be at least 3 letters with no numbers' }))
            setValidFields(prev => ({ ...prev, name: false }))
        } else {
            setErrors(prev => ({ ...prev, name: '' }))
            setValidFields(prev => ({ ...prev, name: true }))
        }
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFormData(prev => ({ ...prev, phone: value }))

        if (!value) {
            setErrors(prev => ({ ...prev, phone: '' }))
            setValidFields(prev => ({ ...prev, phone: false }))
        } else if (!validatePhone(value)) {
            setErrors(prev => ({ ...prev, phone: 'Phone number must be at least 11 digits' }))
            setValidFields(prev => ({ ...prev, phone: false }))
        } else {
            setErrors(prev => ({ ...prev, phone: '' }))
            setValidFields(prev => ({ ...prev, phone: true }))
        }
    }

    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setFormData(prev => ({ ...prev, service: value }))

        if (!value) {
            setErrors(prev => ({ ...prev, service: 'Please select a service' }))
        } else {
            setErrors(prev => ({ ...prev, service: '' }))
        }
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, message: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors = { name: '', phone: '', service: '' }
        let isValid = true

        // Validate name
        if (!formData.name || !validateName(formData.name)) {
            newErrors.name = 'Name must be at least 3 letters with no numbers'
            isValid = false
        }

        // Validate phone
        if (!formData.phone || !validatePhone(formData.phone)) {
            newErrors.phone = 'Phone number must be at least 11 digits'
            isValid = false
        }

        // Validate service (required)
        if (!formData.service) {
            newErrors.service = 'Please select a service'
            isValid = false
        }

        setErrors(newErrors)

        if (isValid) {
            // Get service name from value
            const serviceOption = document.querySelector(`option[value="${formData.service}"]`)
            const serviceName = serviceOption?.textContent || ''

            // Prepare payload for server email
            const payload = {
                name: formData.name,
                phone: formData.phone,
                serviceName,
                message: formData.message || '',
                source: 'book-form'
            }

            setSending(true)
            try {
                const res = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })

                const json = await res.json()
                if (!res.ok) {
                    console.error('Email API error', json)
                    // continue — fallback is still to open WhatsApp
                } else {
                    // if using Ethereal test account you'll get a previewUrl — log it for dev
                    if (json.previewUrl) console.info('Email preview:', json.previewUrl)
                }
            } catch (err) {
                console.error('Failed to send email', err)
            } finally {
                setSending(false)
            }

            // Format message for WhatsApp (unchanged behaviour)
            const message = `#Consultation\nName: ${formData.name}\nPhone No: ${formData.phone}\nService: ${serviceName}\n${formData.message ? `Message: ${formData.message}` : ''}`
            const encodedMessage = encodeURIComponent(message)
            const whatsappUrl = `https://wa.me/2348064032113?text=${encodedMessage}`

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank')

            // Reset form
            setFormData({ name: '', phone: '', service: '', message: '' })
            setValidFields({ name: false, phone: false })
        }
    }

    return (
        <section className="py-32">
            <div className="mx-auto max-w-3xl px-8 lg:px-0">
                <h1 className="text-center text-3xl font-semibold lg:text-5xl">Request an Engineering Consultation</h1>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">We&apos;ll help you find the right plan and pricing for your business.</p>

                <Card className="mx-auto mt-12 max-w-lg p-6  shadow-md sm:p-16">
                  

                    <form
                        onSubmit={handleSubmit}
                        className="**:[&>label]:block mt-5 space-y-6 *:space-y-3">
                        <div>
                            <Label htmlFor="name">Full name</Label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleNameChange}
                                    className="border-gray-500 dark:border-input focus:border-orange-500"
                                />
                                {validFields.name && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Image
                                            src="/tick.svg"
                                            alt="Valid"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                )}
                            </div>
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <div className="relative">
                                <Input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    pattern="[0-9+\-() ]+"
                                    placeholder="080 1234 XXXX"
                                    className="border-gray-500 dark:border-input focus:border-orange-500"
                                />
                                {validFields.phone && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Image
                                            src="/tick.svg"
                                            alt="Valid"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                )}
                            </div>
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>

                        <div>
                            <Label htmlFor="country">Select a Service</Label>
                            <select
                                id="country"
                                value={formData.service}
                                onChange={handleServiceChange}
                                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                            >
                                <option value="">Select a Service</option>
                                <option value="1">Structural Building Construction</option>
                                <option value="2">Roofing Systems Installation</option>
                                <option value="3">Felting & Waterproofing Solutions</option>
                                <option value="4">Concrete & Reinforcement Works</option>
                                <option value="5">Interior & Exterior Finishing</option>
                                <option value="6">Mansory & Block Works</option>
                                <option value="7">Flooring, Tiling & Paving</option>
                                <option value="8">Construction Project Supervision</option>
                                <option value="9">Architectural Drawing</option>
                            </select>
                            {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
                        </div>


                        <div>
                            <Label htmlFor="msg">Message</Label>
                            <textarea
                                id="msg"
                                rows={3}
                                value={formData.message}
                                onChange={handleMessageChange}
                                className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-gray-500 dark:border-gray-500 focus:border-orange-500 focus:border-2"
                            />
                        </div>

                        <Button type="submit" disabled={sending}>{sending ? 'Sending...' : 'Submit'}</Button>
                    </form>
                </Card>
            </div>
        </section>
    )
}
