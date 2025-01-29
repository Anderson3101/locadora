from django.shortcuts import render, redirect
from .forms import MotoristaForm
from .models import Motorista
from django.contrib import messages

def criar_motorista(request):
    if request.method == 'POST':
        form = MotoristaForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Motorista cadastrado com sucesso!')
            return redirect('listar_motoristas')
    return render(request, 'cadastro_motorista.html')

def listar_motoristas(request):
    motoristas = Motorista.objects.all().order_by('nome')
    return render(request, 'listar_motoristas.html', {'motoristas': motoristas})


def editar_motorista(request, pk):
    motorista = Motorista.objects.get(pk=pk)
    if request.method == 'POST':
        form = MotoristaForm(request.POST, instance=motorista)
        if form.is_valid():
            motorista = form.save(commit=False)
            motorista.status = 'status' in request.POST  # Checkbox é True se marcado
            motorista.save()
            messages.success(request, 'Motorista editado com sucesso!')
            return redirect('listar_motoristas')
    return render(request, 'editar_motorista.html', {'motorista': motorista})


def excluir_motorista(request, pk):
    motorista = Motorista.objects.get(pk=pk)
    motorista.delete()
    messages.success(request, 'Motorista excluído com sucesso!')
    return redirect('listar_motoristas')