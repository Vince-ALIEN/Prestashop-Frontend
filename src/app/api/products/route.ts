// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prestashopAPI } from '@/lib/prestashop';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '12');
    const page = parseInt(searchParams.get('page') || '1');

    const data = await prestashopAPI.getProducts({ limit, page });
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}