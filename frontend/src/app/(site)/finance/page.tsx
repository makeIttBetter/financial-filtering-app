// frontend/src/app/(site)/finance/page.tsx

"use client";
import React, { Suspense } from "react";
import Head from "next/head";
import FinanceContent from "@/components/FinanceContent";

export default function FinancePage() {
    return (
        <>
            <Head>
                <title>Financial Data Filtering App</title>
                <meta name="description" content="Financial Data Filtering Application" />
            </Head>

            {/* Wrap the FinanceContent component in a Suspense boundary */}
            <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
                <FinanceContent />
            </Suspense>
        </>
    );
}
