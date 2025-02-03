from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_GET
from .forms import AluguelForm
from .models import Aluguel
from motorista.models import Motorista
from veiculo.models import Veiculo
from django.db.models import Q

from django.contrib import messages
from django.core.paginator import Paginator
from django.http import JsonResponse

def criar_aluguel(request):
    if request.method == 'POST':
        form = AluguelForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Aluguel cadastrado com sucesso!')
            return redirect('listar_alugueis')
    else:
        form = AluguelForm()

    return render(request, 'cadastro_aluguel.html', {
        'form': form
    })

@require_GET
def buscar_motoristas(request):
    termo = request.GET.get('q', '')
    resultados = []
    if termo:
        motoristas = Motorista.objects.filter(nome__icontains=termo)[:10]  # Limita a 10 resultados
        resultados = [{'id': m.id, 'nome': m.nome} for m in motoristas]
    return JsonResponse(resultados, safe=False)

@require_GET
def buscar_veiculos(request):
    termo = request.GET.get('q', '')
    resultados = []
    if termo:
        veiculos = Veiculo.objects.filter(placa__icontains=termo)[:10]
        resultados = [{'id': v.id, 'placa': v.placa} for v in veiculos]
    return JsonResponse(resultados, safe=False)

def listar_alugueis(request):
    status = request.GET.get('status', '')
    pesquisa = request.GET.get('pesquisa', '')
    exibir = int(request.GET.get('exibir', 20))

    alugueis = Aluguel.objects.all()

    if status:
        alugueis = alugueis.filter(status=status)

    if pesquisa:
        alugueis = alugueis.filter(
            veiculo__placa__icontains=pesquisa
        ) | alugueis.filter(
            motorista__nome__icontains=pesquisa
        )

    alugueis = alugueis.order_by('-data_pagamento')
    paginator = Paginator(alugueis, exibir)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return render(request, 'partials/lista_alugueis.html', {'alugueis': page_obj})

    return render(request, 'listar_aluguel.html', {
        'alugueis': page_obj,
        'status': status,
        'pesquisa': pesquisa,
        'exibir': exibir,
    })

def editar_aluguel(request, pk):
    aluguel = get_object_or_404(Aluguel, pk=pk)
    veiculos = Veiculo.objects.all()
    motoristas = Motorista.objects.all()

    if request.method == 'POST':
        data = request.POST.copy()
        data['taxa'] = data.get('taxa', '0').replace(',', '.')
        data['valor_pago'] = data.get('valor_pago', '0').replace(',', '.')

        form = AluguelForm(data, instance=aluguel)
        if form.is_valid():
            form.save()
            messages.success(request, 'Aluguel atualizado com sucesso!')
            return redirect('listar_alugueis')
        else:
            print(form.errors)  # Verificar possíveis erros

    return render(request, 'editar_aluguel.html', {
        'aluguel': aluguel,
        'veiculos': veiculos,
        'motoristas': motoristas
    })

def excluir_aluguel(request, pk):
    aluguel = get_object_or_404(Aluguel, pk=pk)
    aluguel.delete()
    messages.success(request, 'Aluguel excluído com sucesso!')
    return redirect('listar_alugueis')

def buscar_alugueis(request):
    pesquisa = request.GET.get('pesquisa', '')

    alugueis = Aluguel.objects.filter(
        veiculo__placa__icontains=pesquisa
    ) | Aluguel.objects.filter(
        motorista__nome__icontains=pesquisa
    )

    data = list(alugueis.values('id', 'veiculo__placa', 'motorista__nome', 'valor_pago', 'data_pagamento', 'status'))
    return JsonResponse({'alugueis': data})
