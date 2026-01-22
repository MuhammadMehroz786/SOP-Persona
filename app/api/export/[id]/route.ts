import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import puppeteer from 'puppeteer';
import { pdfTemplate } from '@/lib/pdf-template';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const sop = await prisma.sOP.findUnique({
            where: { id },
        });

        if (!sop) {
            return NextResponse.json(
                { error: 'SOP not found' },
                { status: 404 }
            );
        }

        // Launch puppeteer
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        // Set content using our template
        const html = pdfTemplate(sop);
        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm',
            },
        });

        await browser.close();

        // Return PDF response
        return new NextResponse(new Uint8Array(pdfBuffer), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${sop.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf"`,
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        );
    }
}
