import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import styles from './PaymentMethod.module.css';

interface PaymentMethodProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PaymentMethod({ isOpen, onClose }: PaymentMethodProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    if (!isOpen) return null;

    const copyToClipboard = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const bankAccounts = {
        bcp: {
            cuenta: '1932668759059',
            cci: '00219300266875905911',
        },
        banbif: {
            cuenta: '007000605162',
            cci: '03820610700060516299',
        },
    };

    // const recipientName = 'Centro de Arbitraje Latinoamericano E Investigaciones Juridicas SAC';

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className={styles.closeButton}
                    aria-label="Cerrar"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className={styles.content}>
                    {/* Title */}
                    <h2 className={styles.title}>
                        MÉTODOS DE PAGO
                    </h2>

                    {/* Main Content Grid */}
                    <div className={styles.mainContent}>
                        {/* Bank Transfers Section */}
                        <div className={styles.bankSection}>
                            <h3 className={styles.sectionTitle}>
                                Transferencias bancarias
                            </h3>

                            <div className={styles.banksList}>
                                {/* BCP Bank */}
                                <div className={styles.bankItem}>
                                    <div className={styles.bankLogoContainer}>
                                        <img
                                            src="https://cearlatinoamericano.pe/images/bcp.webp"
                                            alt="BCP Logo"
                                            className={styles.bankLogo}
                                        />
                                    </div>
                                    <div className={styles.bankDetails}>
                                        <div className={styles.accountField}>
                                            <p className={styles.fieldLabel}>CUENTA CORRIENTE:</p>
                                            <div className={styles.fieldContainer}>
                                                <code className={styles.accountCode}>
                                                    {bankAccounts.bcp.cuenta}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(bankAccounts.bcp.cuenta, 'bcp-cuenta')}
                                                    className={styles.copyButton}
                                                    aria-label="Copiar cuenta"
                                                >
                                                    {copiedField === 'bcp-cuenta' ? (
                                                        <Check className="w-3 h-3 text-green-600" />
                                                    ) : (
                                                        <Copy className="w-3 h-3 text-gray-600" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className={styles.accountField}>
                                            <p className={styles.fieldLabel}>CCI:</p>
                                            <div className={styles.fieldContainer}>
                                                <code className={styles.accountCode}>
                                                    {bankAccounts.bcp.cci}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(bankAccounts.bcp.cci, 'bcp-cci')}
                                                    className={styles.copyButton}
                                                    aria-label="Copiar CCI"
                                                >
                                                    {copiedField === 'bcp-cci' ? (
                                                        <Check className="w-3 h-3 text-green-600" />
                                                    ) : (
                                                        <Copy className="w-3 h-3 text-gray-600" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* BanBif Bank */}
                                <div className={styles.bankItem}>
                                    <div className={styles.bankLogoContainer}>
                                        <img
                                            src="https://cearlatinoamericano.pe/images/banbif.svg"
                                            alt="BanBif Logo"
                                            className={styles.bankLogo}
                                        />
                                    </div>
                                    <div className={styles.bankDetails}>
                                        <div className={styles.accountField}>
                                            <p className={styles.fieldLabel}>CUENTA CORRIENTE:</p>
                                            <div className={styles.fieldContainer}>
                                                <code className={styles.accountCode}>
                                                    {bankAccounts.banbif.cuenta}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(bankAccounts.banbif.cuenta, 'banbif-cuenta')}
                                                    className={styles.copyButton}
                                                    aria-label="Copiar cuenta"
                                                >
                                                    {copiedField === 'banbif-cuenta' ? (
                                                        <Check className="w-3 h-3 text-green-600" />
                                                    ) : (
                                                        <Copy className="w-3 h-3 text-gray-600" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className={styles.accountField}>
                                            <p className={styles.fieldLabel}>CCI:</p>
                                            <div className={styles.fieldContainer}>
                                                <code className={styles.accountCode}>
                                                    {bankAccounts.banbif.cci}
                                                </code>
                                                <button
                                                    onClick={() => copyToClipboard(bankAccounts.banbif.cci, 'banbif-cci')}
                                                    className={styles.copyButton}
                                                    aria-label="Copiar CCI"
                                                >
                                                    {copiedField === 'banbif-cci' ? (
                                                        <Check className="w-3 h-3 text-green-600" />
                                                    ) : (
                                                        <Copy className="w-3 h-3 text-gray-600" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Credit/Debit Card Section - Bottom Center */}
                    <div className={styles.cardSection}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>
                                Pago con tarjeta de crédito o débito
                            </h3>
                            <p className={styles.cardSubtitle}>
                                (5% adicional)
                            </p>
                            <p className={styles.cardDescription}>
                                Paga en línea tu solicitud
                            </p>
                            <a
                                href="https://pagolink.niubiz.com.pe/pagoseguro/CEARLATINOAMERICANO/1726923"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.cardLink}
                            >
                                PAGA AQUÍ
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

