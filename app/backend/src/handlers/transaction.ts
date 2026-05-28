import { Request, Response } from 'express';

interface SubmitTransactionRequest {
    transactionXdr: string;
    networkPassphrase?: string;
}

// POST /v1/transactions/submit
// The idempotency middleware handles deduplication before this runs.
export const submitTransaction = async (req: Request, res: Response) => {
    const { transactionXdr } = req.body as SubmitTransactionRequest;

    try {
        // TODO: Replace with your actual Soroban RPC call
        const result = {
            hash: 'stub-hash-' + Date.now(),
            resultXdr: 'AAAAAAA=',
            ledger: 1,
        };

        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(502).json({
            error: 'transaction_failed',
            detail: error.message,
        });
    }
};

// GET /v1/transactions/:hash
export const getTransaction = async (req: Request, res: Response) => {
    const { hash } = req.params;
    return res.status(404).json({ error: 'not_found', hash });
};