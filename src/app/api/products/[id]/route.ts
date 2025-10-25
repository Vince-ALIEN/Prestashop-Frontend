// src/app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prestashopAPI } from '@/lib/prestashop';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await prestashopAPI.getProduct(params.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}