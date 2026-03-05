import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';

const AdminMFA = () => {
    const navigate = useNavigate();
    const [mfaCode, setMfaCode] = useState('');
    const [error, setError] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isFirstSetup, setIsFirstSetup] = useState(false);
    const [tempSecret, setTempSecret] = useState(null);

    useEffect(() => {
        // Check if MFA is already set up in this browser
        const savedSecret = localStorage.getItem('enfono_mfa_secret');

        if (!savedSecret) {
            // Generate a secure random base32 hidden secret
            setIsFirstSetup(true);
            const secret = new OTPAuth.Secret({ size: 20 });
            setTempSecret(secret.base32);

            // Generate standard TOTP URI for Google Authenticator
            const totp = new OTPAuth.TOTP({
                issuer: 'Enfono Tech',
                label: 'Admin (v2.enfono.com)',
                algorithm: 'SHA1',
                digits: 6,
                period: 30,
                secret: secret
            });

            // Make the QR Code image
            QRCode.toDataURL(totp.toString(), (err, data_url) => {
                if (!err) {
                    setQrCodeUrl(data_url);
                }
            });
        }
    }, []);

    const handleVerify = (e) => {
        e.preventDefault();
        setError('');

        if (mfaCode.length !== 6) {
            setError('Please enter a 6-digit code');
            return;
        }

        const secretToUse = isFirstSetup ? tempSecret : localStorage.getItem('enfono_mfa_secret');

        // Create the TOTP verifier based on the saved or temp secret
        const totp = new OTPAuth.TOTP({
            issuer: 'Enfono Tech',
            label: 'Admin (v2.enfono.com)',
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(secretToUse)
        });

        // Validate the code
        const delta = totp.validate({ token: mfaCode, window: 1 });

        if (delta !== null) {
            if (isFirstSetup) {
                // Save the secret permanently since they proved they can scan it
                localStorage.setItem('enfono_mfa_secret', tempSecret);
            }

            // Issue the session tokens
            localStorage.setItem('enfono_admin_session', 'valid');
            localStorage.setItem('enfono_mfa_verified', 'true');

            // Redirect to dashboard
            navigate('/admin');
        } else {
            setError('Invalid code. Please try again.');
        }
    };

    return (
        <div className="admin-login-page">
            <div className="login-card" style={{ maxWidth: '400px' }}>
                <div className="login-header">
                    <img src="/assets/img/enfono-logo.png" alt="Enfono" className="login-logo" />
                    <h2>Two-Factor Authentication</h2>
                    <p>Enter the code from your Authenticator app</p>
                </div>

                {isFirstSetup && qrCodeUrl && (
                    <div className="mfa-setup text-center mb-4" style={{
                        background: '#f8fafc',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                    }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', marginBottom: '10px' }}>
                            Setup Required
                        </h4>
                        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>
                            Scan this QR code with Google Authenticator or Authy to secure your admin account.
                        </p>
                        <img
                            src={qrCodeUrl}
                            alt="MFA QR Code"
                            style={{
                                width: '180px',
                                height: '180px',
                                margin: '0 auto',
                                display: 'block',
                                borderRadius: '8px'
                            }}
                        />
                        <div className="mt-3 text-start">
                            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Or enter setup key manually:</p>
                            <code style={{ fontSize: '14px', color: '#2563eb', fontWeight: 'bold' }}>{tempSecret}</code>
                        </div>
                    </div>
                )}

                <form onSubmit={handleVerify} className="login-form">
                    <div className="form-group">
                        <label>6-Digit Code</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            pattern="\d{6}"
                            maxLength="6"
                            value={mfaCode}
                            onChange={(e) => setMfaCode(e.target.value)}
                            placeholder="000000"
                            required
                            style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '20px', fontWeight: 'bold' }}
                        />
                    </div>

                    {error && (
                        <div style={{ color: '#ef4444', fontSize: '14px', marginBottom: '15px', textAlign: 'center' }}>
                            <i className="fas fa-exclamation-circle me-1"></i> {error}
                        </div>
                    )}

                    <button type="submit" className="login-btn w-100">
                        Verify & Login
                    </button>

                    <button
                        type="button"
                        className="btn btn-link w-100 mt-3 text-muted"
                        onClick={() => navigate('/admin/login')}
                    >
                        Return to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminMFA;
